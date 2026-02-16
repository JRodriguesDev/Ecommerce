'use server'

import { generateToken } from '@/lib/otplib/twoFactor'
import { setTwoFactor, verifyTwoFactor } from '@/services/DAL/auth'
import { cookies } from 'next/headers'
import { generateToken as jwtGenerate, verifyToken } from '@/lib/jwt/token'
import { sendTwoFactorTokenEmail } from '@/lib/resend/twoFactor/sender'
import {FormState} from '../../types'

export const sendCodeAction = async (prevState: FormState, form: FormData): Promise<FormState> => {
    const email = form.get('email') as string
    try {
        const { token, secret } = await generateToken()
        const userId = await setTwoFactor(email, token, secret)
        
        if (!userId) {
            return { success: false, error: "User not found." }
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
        return { success: false, error: "Failed to process request." }
    }
}

export const verifyCodeAction = async (code: string) => {
    try {
        const cookieStore = await cookies()
        const twoFactorCookie = cookieStore.get('2fa_reset')
        
        // 1. Verifica se o cookie existe
        if (!twoFactorCookie) {
            return { success: false, error: 'Session expired. Please request a new code.' }
        }

        // 2. Valida o JWT (Pode lançar erro se o token for inválido ou alterado)
        const jwtToken = await verifyToken(twoFactorCookie.value)
        
        if (!jwtToken?.payload?.userId) {
            return { success: false, error: 'Invalid security session.' }
        }

        const userId = jwtToken.payload.userId as string

        // 3. Busca o token no banco de dados
        const tokenData = await verifyTwoFactor(userId)

        // 4. Compara o código enviado com o do banco
        if (!tokenData || code !== tokenData.token) {
            return { success: false, error: 'Incorrect code. Please try again.' }
        }

        // Se chegou aqui, está tudo certo
        return { success: true }

    } catch (error) {
        // Logamos o erro no servidor para debug
        console.error("Critical error in verifyCodeAction:", error)
        
        // Retornamos uma mensagem amigável para o usuário
        return { 
            success: false, 
            error: 'An internal error occurred. Please try again later.' 
        }
    }
}