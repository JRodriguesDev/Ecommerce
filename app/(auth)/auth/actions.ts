'use server'

import {loginSchema, registerSchema} from './schema'
import {userRegister} from '@/services/DAL/auth'
import {FormState} from './types'
import {signIn} from '@/lib/authjs/auth'
import {redirect} from 'next/navigation'
import { Prisma } from '@/lib/prisma/index'
import { AuthError } from 'next-auth'

export const loginForm = async (prevState: FormState, form: FormData): Promise<FormState> => {
    const validatedFields = loginSchema.safeParse({
        email: form.get('email'),
        password: form.get('password')
    })
    if (!validatedFields.success) return {sucess: false, error: 'Invalid fields. Please check your email and password.'}
    const {email, password} = validatedFields.data
    try {
        await signIn('credentials', {email, password, redirect: false})
    } catch (err) {
        if (err instanceof AuthError) {
            return {sucess: false, error: 'Invalid email or password.'}
        }
    }
    redirect('/shop')
}

export const registerForm = async (prevState: FormState, form: FormData): Promise<FormState> => {
    const validatedFields = registerSchema.safeParse({
        name: form.get('name'),
        email: form.get('email'),
        password: form.get('password')
    })
    if (!validatedFields.success) return {sucess: false, error: 'Invalid fields. Please check your name, email and password.'}
    const {email, password} = validatedFields.data
    try {
        await userRegister(validatedFields.data)
        await signIn('credentials', {email, password, redirect: false})
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') return {sucess: false, error: 'This email is already registered.'}
        }
        return {sucess: false, error: 'A database error occurred. Please try again.'}
    }
    redirect('/shop')
}