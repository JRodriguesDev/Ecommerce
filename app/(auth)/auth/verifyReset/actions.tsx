'use server'

import { generateToken } from '@/lib/otplib/twoFactor'
import { setTwoFactor, verifyTwoFactor } from '@/services/DAL/auth'
import { cookies } from 'next/headers'
import { generateToken as jwtGenerate, verifyToken } from '@/lib/jwt/token'
import { sendTwoFactorTokenEmail } from '@/lib/resend/twoFactor/sender'

export const resetPasswordAction = async (email: string) => {
    try {
        const { token, secret } = await generateToken()
        const userId = await setTwoFactor(email, token, secret)
        
        if (!userId) {
            return { success: false, error: "Usuário não encontrado." }
        }

        const cookieStore = await cookies()
        const jwt = await jwtGenerate({ userId: userId })
        
        cookieStore.set({
            name: '2fa_reset', 
            value: jwt, 
            httpOnly: true, 
            secure: true, 
            sameSite: 'strict', 
            maxAge: 600, 
            path: '/'
        })

        await sendTwoFactorTokenEmail(email, token)
        
        return { success: true } // Retorna sucesso para o componente liberar o OTP
        
    } catch (error) {
        console.error("Reset Password Error:", error)
        return { success: false, error: "Falha ao processar solicitação." }
    }
}

export const verifyCodeAction = async (code: string) => {
    const cookieStore = await cookies()
    const twoFactorCookie = cookieStore.get('2fa_reset')
    if (!twoFactorCookie) return {success: false, error: 'expired'}
    const jwtToken = await verifyToken(twoFactorCookie!.value as string)
    const tokenData = await verifyTwoFactor(jwtToken.payload.userId as string)
    if (!tokenData || code !== tokenData.token) return { success: false, error: 'Código incorreto. Tente novamente.' }
    return { success: true}
}