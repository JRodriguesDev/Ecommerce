'use server'

import { getLowStockProducts, getProductsByRating } from '@/services/DAL/shop'

export const productsLowStockAction = async () => {
    try {
        const products = await getLowStockProducts()
        return products ?? [] // Garante que sempre retorne um array, mesmo que nulo
    } catch (error) {
        console.error("Failed to fetch low stock products:", error)
        return [] // Retorno seguro para o frontend
    }
}

export const productsByCategoryAction = async () => {
    try {
        return await getProductsByRating()
    } catch (error) {
        console.error(`Failed to fetch products for rating:`, error)
        return []
    }
}