'use server'

import {getLowStockProducts, getProductsByCategory} from '@/services/DAL/shop'

export const productsLowStock = async () => {
    return await getLowStockProducts()
}

export const productsByCategory = async (category: string) => {
    return await getProductsByCategory(category)
}