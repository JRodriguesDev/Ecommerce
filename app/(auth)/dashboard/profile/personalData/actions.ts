'use server'

import { getProfile } from '@/services/DAL/user'

export const profile = async () => {
    try {
        // A DAL já garante que o usuário está autenticado e retorna os dados limpos
        const data = await getProfile()
        
        return data || null
    } catch (error) {
        // Logamos o erro para monitoramento interno (Sentry, Logtail, etc)
        console.error("[ACTION ERROR] Falha na comunicação com o serviço de perfil:", error)
        
        // Retornamos null para que a UI trate como "não encontrado" ou "desconectado"
        return null
    }
}