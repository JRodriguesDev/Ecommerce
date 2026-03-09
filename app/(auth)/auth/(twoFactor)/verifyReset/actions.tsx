'use server'

import { generateToken } from '@/lib/otplib/twoFactor'
import { setTwoFactorDB, verifyTwoFactorDB } from '@/services/DAL/auth'
import { cookies } from 'next/headers'
import { jwtGenerateToken, jwtVerifyToken } from '@/lib/jwt/token'
import { sendTwoFactorTokenEmail } from '@/lib/resend/twoFactor/sender'
import {FormState} from '../../types'
import {emailSchema} from '../../schema'

export const sendCodeAction = async (prevState: FormState, form: FormData): Promise<FormState> => {
    const validateField = emailSchema.safeParse({
        email: form.get('email')
    })
    if (!validateField.success) return {success: false, error: validateField.error.flatten().fieldErrors.email?.[0]}
    const {email} = validateField.data
    try {
        const { token, secret } = await generateToken()
        const userId = await setTwoFactorDB(email, token, secret)
        
        if (!userId) return { success: false, error: "Email not found" }

        const cookieStore = await cookies()
        const jwt = await jwtGenerateToken({ userId: userId })
        
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
        console.log(error)
        return { success: false, error: "Internal Error." }
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
        const jwtToken = await jwtVerifyToken(twoFactorCookie.value)
        
        if (!jwtToken?.payload?.userId) {
            return { success: false, error: 'Invalid security session.' }
        }

        const userId = jwtToken.payload.userId as string

        // 3. Busca o token no banco de dados
        const tokenData = await verifyTwoFactorDB(userId)

        // 4. Compara o código enviado com o do banco
        if (!tokenData || code !== tokenData.token) {
            return { success: false, error: 'Incorrect code. Please try again.' }
        }

        // Se chegou aqui, está tudo certo
        return { success: true }

    } catch (error) {
        // Retornamos uma mensagem amigável para o usuário
        return { 
            success: false, 
            error: 'An internal error occurred. Please try again later.' 
        }
    }
}