'use server'

import { cookies } from "next/headers";
import { verifyToken as verifyTokenJWT } from '@/lib/jwt/token'
import { verifyTwoFactor } from '@/services/DAL/auth'

export const verify2Fa = async (code: string) => {
    try {
        const cookieStore = await cookies()
        const cookie2Factor = cookieStore.get('2fa_login_email')?.value

        if (!cookie2Factor) {
            return { success: false, error: 'Session expired. Please try again.' }
        }

        // Decodifica o JWT para pegar o userId
        const token = await verifyTokenJWT(cookie2Factor)
        const userId = token.payload.userId as string

        // Busca o token no banco
        const tokenData = await verifyTwoFactor(userId)

        if (!tokenData || code !== tokenData.token) {
            return { success: false, error: 'Incorrect code. Please try again.' }
        }

        // --- SUCESSO ---
        // Aqui você chamaria o seu login oficial (ex: Auth.js) 
        // ou deletaria o cookie de 2FA
        cookieStore.delete('2fa_login_email')
        
        // Retornamos sucesso para o cliente fazer o redirect
        return { success: true, email: tokenData.email}

    } catch (err) {
        return { success: false, error: 'Ocorreu um erro interno. Tente mais tarde.' }
    }
}