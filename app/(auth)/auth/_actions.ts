'use server'

import {loginSchema, registerSchema} from './_schema'
import {FormState} from './_types'
import bcrypt from 'bcryptjs'

export const loginForm = async (prevState: FormState, form: FormData): Promise<FormState> => {
    const validatedFields = loginSchema.safeParse({
        email: form.get('email'),
        password: form.get('password')
    })
    if (!validatedFields.success) return {sucess: false, error: 'Invalid'}

    return {sucess: true, error: null}
}

export const registerForm = async (prevState: FormState, form: FormData): Promise<FormState> => {
    const validateFields = registerSchema.safeParse({
        name: form.get('name'),
        email: form.get('email'),
        password: form.get('password')
    })
    if (!validateFields.success) return {sucess: false, error: 'Invalid'}
    const password = await bcrypt.hash(validateFields.data.password, 10)
    console.log(validateFields)
    console.log(password)
    return {sucess: true, error: null}
}