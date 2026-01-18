'use server'

import {loginSchema, registerSchema} from './schema'
import {userRegister} from '@/lib/prisma/routes/auth'
import {FormState} from './types'
import {signIn} from '@/lib/authjs/auth'
import {redirect} from 'next/navigation'

export const loginForm = async (prevState: FormState, form: FormData): Promise<FormState> => {
    const validatedFields = loginSchema.safeParse({
        email: form.get('email'),
        password: form.get('password')
    })
    if (!validatedFields.success) return {sucess: false, error: 'Campos Invalidos'}
    const {email, password} = validatedFields.data
    await signIn('credentials', {email, password, redirect: false})
    redirect('/shop')
}

export const registerForm = async (prevState: FormState, form: FormData): Promise<FormState> => {
    const validatedFields = registerSchema.safeParse({
        name: form.get('name'),
        email: form.get('email'),
        password: form.get('password')
    })
    if (!validatedFields.success) return {sucess: false, error: 'Campos Invalidos'}
    const {email, password} = validatedFields.data
    const registerResult = await userRegister(validatedFields.data)
    if (!registerResult.sucess) return {sucess: false, error: 'erro no Banco'}
    await signIn('credentials', {email, password, redirect: false})
    redirect('/shop')
}