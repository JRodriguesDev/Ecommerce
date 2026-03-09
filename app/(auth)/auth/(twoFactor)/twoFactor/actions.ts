'use server'

import { cookies } from "next/headers";
import { jwtVerifyToken } from '@/lib/jwt/token'
import { verifyTwoFactorDB } from '@/services/DAL/auth'
import { FormState } from '../../types';
import {signIn} from '@/lib/authjs/auth'

export const verify2FaAction = async (prevState: FormState, form: FormData): Promise<FormState> => {
    const code = form.get('code')
    try {
        const cookieStore = await cookies()
        const cookie2Factor = cookieStore.get('2fa_login_email')?.value

        if (!cookie2Factor) return { success: false, error: 'Session expired. Please try again.' }

        // Decodifica o JWT para pegar o userId
        const token = await jwtVerifyToken(cookie2Factor)
        const userId = token.payload.userId as string

        // Busca o token no banco
        const tokenData = await verifyTwoFactorDB(userId)

        if (!tokenData || code !== tokenData.token) return { success: false, error: 'Incorrect code. Please try again.' }

        // --- SUCESSO ---
        // Aqui você chamaria o seu login oficial (ex: Auth.js) 
        // ou deletaria o cookie de 2FA
        cookieStore.delete('2fa_login_email')
        
        // Retornamos sucesso para o cliente fazer o redirect
        await signIn('credentials', {email: tokenData.email, is2FaVerified: true, redirect: false})
        return {success: true}
    } catch (err) {
        console.log(err)
        return { success: false, error: 'An internal error occurred. Please try again later.' }
    }
}