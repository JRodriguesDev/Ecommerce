import {getCategories} from '@/services/DAL/shop'

export const allCategoriesAction = async () => {
    try {
        const categories = await getCategories()
        return categories ?? []
    } catch (error) {
        // Logamos o erro no servidor para monitoramento
        console.error("Critical: Error fetching categories for layout:", error)
        
        // Retornamos um array vazio para que o menu apenas fique "vazio" 
        // em vez de derrubar o site todo
        return []
    }
}