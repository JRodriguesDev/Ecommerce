'use server'

import {getLowStockProducts, getProductsByCategory, getCategories} from '@/services/DAL/shop'

export const productsLowStock = async () => {
    return await getLowStockProducts()
}

export const productsByCategory = async (category: string) => {
    return await getProductsByCategory(category)
}

export const allCategories = async () => {
    return await getCategories()
}