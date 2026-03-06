'use server'

// 1. Next.js Core
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

// 2. Auth & Security
import { signIn } from '@/lib/authjs/auth'
import { AuthError } from 'next-auth'
import { generateToken } from '@/lib/otplib/twoFactor'
import { setTwoFactorDB } from '@/services/DAL/auth'

// 3. Database & Services
import { verifyLogin } from '@/services/DTO/auth'
import { jwtGenerateToken } from '@/lib/jwt/token'
import { sendTwoFactorTokenEmail } from '@/lib/resend/twoFactor/sender'

// 4. Validation, Types & Schemas
import { loginSchema } from '../schema'
import { FormState } from '../types'

export const loginFormAction = async (prevState: FormState, form: FormData): Promise<FormState> => {
    const validatedFields = loginSchema.safeParse({
        email: form.get('email'),
        password: form.get('password')
    })
    if (!validatedFields.success) {
        const fieldsErros = validatedFields.error.flatten().fieldErrors
        const errorMessage = fieldsErros.email?.[0] || fieldsErros.password?.[0]
        return { success: false, error: errorMessage }
    }
    const { email, password } = validatedFields.data
    let twoFactor: boolean = false
    try {
        twoFactor = await verifyLogin(email, password)
        if (twoFactor) {
            const { token, secret } = await generateToken()
            const userId = await setTwoFactorDB(email, token, secret)
            const cookieStore = await cookies()
            const jwt = await jwtGenerateToken({ userId: userId })
            cookieStore.set({ name: '2fa_login_email', value: jwt, httpOnly: true, secure: true, sameSite: 'strict', maxAge: 300, path: '/' })
            await sendTwoFactorTokenEmail(email, token)
        } else {
            await signIn('credentials', { email: email, password: password, redirect: false })
        }
    } catch (err) {
        if (err instanceof Error && (err.message === 'User not found' || err.message === 'Password incorrect')) {
            return {success: false, error: 'Invalid email or password.'}
        }
        if (err instanceof AuthError) return { success: false, error: 'Invalid email or password.' }
        return { success: false, error: 'Something went wrong.' }
    }
    if (twoFactor) redirect('/auth/twoFactor')
    redirect('/shop')
}
