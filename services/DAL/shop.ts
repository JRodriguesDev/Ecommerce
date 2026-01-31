import 'server-only'

import { cacheTag } from 'next/cache'
import prisma from '@/lib/prisma'
import {ParamsFilter} from '@/types/params'

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
