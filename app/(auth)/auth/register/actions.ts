'use server'

// 1. Next.js Core
import { redirect } from 'next/navigation'

// 2. Auth & Security
import { signIn } from '@/lib/authjs/auth'
import { AuthError } from 'next-auth'

// 3. Database & Services
import { Prisma } from '@/lib/prisma/index'
import { userRegisterDB } from '@/services/DAL/auth'
import { createCustomer } from '@/services/stripe/customer'

// 4. Validation, Types & Schemas
import { registerSchema } from '../schema'
import { FormState } from '../types'
import bcrypt from 'bcryptjs'

export const registerFormAction = async (prevState: FormState, form: FormData): Promise<FormState> => {
    const validatedFields = registerSchema.safeParse({
        name: form.get('name'),
        email: form.get('email'),
        password: form.get('password')
    })
    if (!validatedFields.success) {
        const fieldsErros = validatedFields.error.flatten().fieldErrors
        const errorMessage = fieldsErros.name?.[0] || fieldsErros.email?.[0] || fieldsErros.password?.[0]
        return { success: false, error: errorMessage }
    }
    validatedFields.data.password = await bcrypt.hash(validatedFields.data.password, 10)
    const { name, email, password } = validatedFields.data
    try {
        const customerId = await createCustomer(name, email)
        await userRegisterDB(name, email, password, customerId)
        await signIn('credentials', { email, password, redirect: false })
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') return { success: false, error: 'This email is already registered.' }
        }
        if (err instanceof AuthError) return { success: false, error: 'Invalid email or password.' }
        return { success: false, error: 'Registration failed. Please try again.' }
    }
    redirect('/shop')
}

