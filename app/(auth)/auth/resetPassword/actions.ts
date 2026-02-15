'use server'

import { cookies } from "next/headers"
import { verifyToken } from '@/lib/jwt/token'
import { securityResetPassword } from '@/services/DAL/user'
import bcrypt from 'bcryptjs'

export const updatePasswordAction = async (password: string) => {
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