import 'server-only'

import prisma from '@/lib/prisma/index'

export const toggleFavorite = async (userId: string, productId: string) => {
    const result = await prisma.$transaction(async (prisma) => {
        const existing = await prisma.favorite.findUnique({
            where: {
                userId_productId: {userId, productId}
            },
            select: {id: true}
        })
        if (existing) {
            await prisma.favorite.delete({
                where: {id: existing.id}
            })
            return {action: false}
        } else {
            await prisma.favorite.create({
                data: {userId, productId}
            })
            return {action: true}
        }
    })
    return result
}

export const isFavorite = async (userId: string, productId: string) => {
    const result = await prisma.favorite.findUnique({
        where: {userId_productId: {userId, productId}},
        select: {productId: true}
    })
    return !!result
}

export const getFavorites = async (userId: string) => {
    const result = await prisma.$transaction(async (prisma) => {
        const favorites = await prisma.favorite.findMany({
            where: {userId: userId},
            select: {productId: true}
        })
        if (favorites.length === 0) return []
        const productIds = favorites.map(f => f.productId)
        const products = await prisma.product.findMany({
            where: {id: {in: productIds}},
            select: {
                id: true,
                title: true,
                thumbnail: true,
                price: true,
                rating: true,
                slug: true,
                stock: true
            }
        })
        return products
    })
    return result
}