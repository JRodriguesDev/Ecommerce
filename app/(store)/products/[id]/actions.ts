import { getProductById } from '@/services/DAL/shop'

export const getProduct = async (id: string) => {
    try {
        // Validação básica de entrada
        if (!id) return null

        const product = await getProductById(id)

        // Se o DAL retornar undefined ou null, tratamos aqui
        if (!product) {
            return null
        }

        return product
    } catch (error) {
        // Faxina: Logamos o erro internamente para debug, 
        // mas não "quebramos" a aplicação para o usuário.
        console.error(`[ACTION ERROR] Falha ao obter produto ${id}:`, error)
        
        // Retornamos null para que o componente decida como reagir (ex: notFound())
        return null
    }
}