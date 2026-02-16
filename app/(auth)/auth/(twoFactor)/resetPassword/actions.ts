'use server'

import { cookies } from "next/headers"
import { verifyToken } from '@/lib/jwt/token'
import { securityResetPassword } from '@/services/DAL/user'
import bcrypt from 'bcryptjs'
import {FormState} from '../../types'
import {ResetPasswordSchema} from '../../schema'

export const updatePasswordAction = async (prevState: FormState, form: FormData): Promise<FormState> => {
    const password = form.get('password') as string;
    const confirmPassword = form.get('confirmPassword') as string;
    const validatedFields = ResetPasswordSchema.safeParse({
        password: password,
        confirmPassword: confirmPassword
    })
    if (!validatedFields.success) return {success: false, error: 'Invalid fields. Please check your password.'}
    if (password !== confirmPassword) return { success: false, error: "Passwords do not match." }
    try {
        const cookieStore = await cookies()
        const twoFactorCookie = cookieStore.get('2fa_reset')
        
        if (!twoFactorCookie) {
            return { success: false, error: 'Sessão expirada.' }
        }

        const jwt = await verifyToken(twoFactorCookie.value)
        const userId = jwt.payload?.userId as string

        if (!userId) {
            return { success: false, error: 'Token inválido.' }
        }
        const newPassword = await bcrypt.hash(password, 10)
        // Atualiza a senha no banco
        await securityResetPassword(userId, newPassword)

        // Limpa o cookie de autorização do reset após o sucesso
        cookieStore.delete('2fa_reset')

        return { success: true }
    } catch (error) {
        console.error("Update Password Error:", error)
        return { success: false, error: 'Erro ao atualizar senha.' }
    }
}