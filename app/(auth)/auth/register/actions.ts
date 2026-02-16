'use server'

// 1. Next.js Core
import { redirect } from 'next/navigation'

// 2. Auth & Security
import { signIn } from '@/lib/authjs/auth'

// 3. Database & Services
import { Prisma } from '@/lib/prisma/index'
import { userRegister } from '@/services/DAL/auth'

// 4. Validation, Types & Schemas
import { registerSchema } from '../schema'
import { FormState } from '../types'

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

