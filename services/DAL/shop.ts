import 'server-only'

import { cacheTag } from 'next/cache'
import prisma from '@/lib/prisma'
import {ParamsFilter} from '@/types/params'

export const getLowStockProducts = async () => {
    'use cache'
    cacheTag('productsLowStock')
    const products = await prisma.product.findMany({
        where: {stock: {lt: 25}},
        orderBy: {rating: 'desc'},
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

export const getProductsByRating = async () => {
    'use cache'
    cacheTag(`products_top_rated}`)
    const products = await prisma.product.findMany({
        where: {rating: {gte: 4}},
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

export const getFilteredProducts = async (filtered: ParamsFilter) => {
        const minRating = (filtered.rating && filtered.rating.length > 0)
        ? Math.min(...filtered.rating.map(Number))
        : undefined;

    const products = await prisma.product.findMany({
        where: {
            category: filtered.cat,
            title: {startsWith: filtered.q, mode: 'insensitive'},
            price: {gte: filtered.minPrice, lte: filtered.maxPrice},
            stock: filtered.inStock ? {gt: 0} : undefined,
            rating: minRating ? { gte: minRating } : undefined 
        },
        omit: {
            description: true,
            images: true,
        }
    })

    return products
}

export const getProductById = async (id: string) => {
    const product = await prisma.product.findUnique({
        where: {id: id},
        omit: {
            category: true
        }
    })
    return product
}
