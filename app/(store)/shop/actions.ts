'use server'

import { getLowStockProducts, getProductsByCategory } from '@/services/DAL/shop'

export const productsLowStock = async () => {
    try {
        const products = await getLowStockProducts()
        return products ?? [] // Garante que sempre retorne um array, mesmo que nulo
    } catch (error) {
        console.error("Failed to fetch low stock products:", error)
        return [] // Retorno seguro para o frontend
    }
}

export const productsByCategory = async (category: string) => {
    if (!category) return []

    try {
        return await getProductsByCategory(category)
    } catch (error) {
        console.error(`Failed to fetch products for category ${category}:`, error)
        return []
    }
}