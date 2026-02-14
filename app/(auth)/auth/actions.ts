'use server'

// 1. Next.js Core
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

// 2. Auth & Security
import { signIn, auth } from '@/lib/authjs/auth'
import { AuthError } from 'next-auth'
import {generateToken} from '@/lib/otplib/twoFactor'
import {setTwoFactor} from '@/services/DAL/auth'

// 3. Database & Services
import { Prisma } from '@/lib/prisma/index'
import { userRegister } from '@/services/DAL/auth'
import {verifyLogin} from '@/services/DTO/auth'
import {generateToken as jwtGenerate} from '@/lib/jwt/token'
import {sendTwoFactorTokenEmail} from '@/lib/resend/twoFactor/sender'

// 4. Validation, Types & Schemas
import { loginSchema, registerSchema } from './schema'
import { FormState } from './types'

export const loginForm = async (prevState: FormState, form: FormData): Promise<FormState> => {
    const validatedFields = loginSchema.safeParse({
        email: form.get('email'),
        password: form.get('password')
    })
    if (!validatedFields.success) return {success: false, error: 'Invalid fields. Please check your email and password.'}
    const {email, password} = validatedFields.data
    let twoFactor
    try {
        twoFactor = await verifyLogin(email, password)
        if (twoFactor) {
            const {token, secret} = await generateToken()
            const userId = await setTwoFactor(email, token, secret)
            const cookieStore = await cookies()
            const jwt = await jwtGenerate({userId: userId})
            cookieStore.set({name: '2fa_login_email', value: jwt, httpOnly: true, secure: true, sameSite: 'strict', maxAge: 300, path: '/'})
            await sendTwoFactorTokenEmail(email, token)
        } else {await signIn('credentials', {email, password, redirectTo: '/shop'})}
    } catch (err) {
        if (err instanceof AuthError) {
            return {success: false, error: 'Invalid email or password.'}
        }
        console.log(err)
        return { success: false, error: 'Something went wrong with authentication.' }
    }
    if (twoFactor) redirect('/auth/twoFactor')
}

export const registerForm = async (prevState: FormState, form: FormData): Promise<FormState> => {
    const validatedFields = registerSchema.safeParse({
        name: form.get('name'),
        email: form.get('email'),
        password: form.get('password')
    })
    if (!validatedFields.success) return {success: false, error: 'Invalid fields. Please check your name, email and password.'}
    const {email, password} = validatedFields.data
    try {
        await userRegister(validatedFields.data)
        await signIn('credentials', {email, password, redirect: false})
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') return {success: false, error: 'This email is already registered.'}
        }
        return { success: false, error: 'Registration failed. Please try again.' }
    }
    redirect('/shop')
}

