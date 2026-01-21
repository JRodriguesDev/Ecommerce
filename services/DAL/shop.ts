import 'server-only'

import prisma from '@/lib/prisma'

export const getLowStockProducts = async () => {
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

