import 'server-only'

import { cacheTag } from 'next/cache'
import prisma from '@/lib/prisma'

export const getLowStockProducts = async () => {
    'use cache'
    cacheTag('productsLowStock')
    const products = await prisma.product.findMany({
        where: {stock: {lt: 25}},
        take: 15,
        omit: {
            images: true,
            stock: true, 
            description: true,
            category: true,
        }
    })
    return products
}

export const getProductsByCategory = async (category: string) => {
    'use cache'
    cacheTag(`products_${category}`)
    const products = await prisma.product.findMany({
        where: {category: {startsWith: category, mode: 'insensitive'}},
        take: 15,
        omit: {
            images: true,
            stock: true, 
            description: true,
            category: true,
        }
    })
    return products
}

export const getCategories = async () => {
    'use cache'
    cacheTag('categories')
    const categories = await prisma.category.findMany({
        select: {id: true, name: true}
    })
    return categories
}

