'use server'

import { cookies } from 'next/headers'
import {loginSchema, registerSchema} from './_schema'
import {userRegister, userLogin} from '@/services/prisma/routes/auth'
import {generateToken} from '@/services/jwt/token'
import {FormState} from './_types'

export const loginForm = async (prevState: FormState, form: FormData): Promise<FormState> => {
    const validatedFields = loginSchema.safeParse({
        email: form.get('email'),
        password: form.get('password')
    })
    if (!validatedFields.success) return {sucess: false, error: 'Credenciais Invalidas'}
    const user = await userLogin(validatedFields.data)
    if (!user.sucess) return {sucess: false, error: user.error!}
    const token = await generateToken({id: user.id})
    const cookieStore = await cookies()
    cookieStore.set('auth_session', token, {
        secure: true,
        httpOnly: true,
        sameSite: 'lax',
        priority: 'high'
    })
    return {sucess: true, error: null}
}

export const registerForm = async (prevState: FormState, form: FormData): Promise<FormState> => {
    const validatedFields = registerSchema.safeParse({
        name: form.get('name'),
        email: form.get('email'),
        password: form.get('password')
    })
    if (!validatedFields.success) return {sucess: false, error: 'Credenciais Invalidas'}
    const user = await userRegister(validatedFields.data)
    const token = await generateToken({id: user.id})
    const cookieStore = await cookies()
    cookieStore.set('auth_session', token, {
        secure: true,
        httpOnly: true,
        sameSite: 'lax',
        priority: 'high'
    })
    return {sucess: true, error: null}
}