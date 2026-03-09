'use server'

import { cookies } from "next/headers"
import { jwtVerifyToken } from '@/lib/jwt/token'
import { securityResetPasswordDB } from '@/services/DAL/user'
import bcrypt from 'bcryptjs'
import { FormState } from '../../types'
import { ResetPasswordSchema } from '../../schema'
import { redirect } from "next/navigation"

export const updatePasswordAction = async (prevState: FormState, form: FormData): Promise<FormState> => {
    const validatedFields = ResetPasswordSchema.safeParse({
        password: form.get('password') as string,
        confirmPassword: form.get('confirmPassword') as string
    })
    if (!validatedFields.success) {
        const fieldsError = validatedFields.error.flatten().fieldErrors
        const errorMessage = fieldsError.password?.[0] || fieldsError.confirmPassword?.[0]
        return {success: false, error: errorMessage}
    }
    const password = validatedFields.data.confirmPassword
    try {
        const cookieStore = await cookies()
        const twoFactorCookie = cookieStore.get('2fa_reset')

        if (!twoFactorCookie) {
            return { success: false, error: 'Sessão expirada.' }
        }

        const jwt = await jwtVerifyToken(twoFactorCookie.value)
        const userId = jwt.payload?.userId as string

        if (!userId) {
            return { success: false, error: 'Token inválido.' }
        }
        const newPassword = await bcrypt.hash(password, 10)
        // Atualiza a senha no banco
        await securityResetPasswordDB(userId, newPassword)

        // Limpa o cookie de autorização do reset após o sucesso
        cookieStore.delete('2fa_reset')
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Erro ao atualizar senha.' }
    }
    redirect('/auth/login')
}