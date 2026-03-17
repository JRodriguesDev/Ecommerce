import 'server-only'

import { unstable_cache as nextCache } from 'next/cache'
import prisma from '@/lib/prisma'
import { ParamsFilter } from '@/types/params'

export const getLowStockProducts = async () => {
    const dataCached = nextCache(
        async () => {
            return await prisma.product.findMany({
                where: { stock: { lt: 25 } },
                orderBy: { rating: 'desc' },
                take: 15,
                omit: {
                    images: true,
                    stock: true,
                    description: true,
                    category: true,
                }
            })
        },
        ['low-stock-key'],
        {
            tags: ['low-stock-tag'],
            revalidate: false
        }
    )
    const data = await dataCached()
    return data
}

export const getProductsByRating = async () => {
    const dataCached = nextCache(
        async () => {
            return await prisma.product.findMany({
                where: { rating: { gte: 4 } },
                take: 15,
                omit: {
                    images: true,
                    stock: true,
                    description: true,
                    category: true,
                }
            })
        },
        ['rating-products-key'],
        {
            tags: ['rating-products-tag'],
            revalidate: false
        }
    )

    const data = await dataCached()
    return data
}

export const getCategories = async () => {
    const dataCached = nextCache(
        async () => {
            return await prisma.category.findMany({
                select: { id: true, name: true }
            })
        },
        ['categories-key'],
        {
            tags: ['categories-tag'],
            revalidate: false
        }
    )()
    const data = await dataCached
    return data
}

export const getFilteredProducts = async (filtered: ParamsFilter) => {
    const minRating = (filtered.rating && filtered.rating.length > 0)
        ? Math.min(...filtered.rating.map(Number))
        : undefined;

    const products = await prisma.product.findMany({
        where: {
            category: filtered.cat,
            title: { startsWith: filtered.q, mode: 'insensitive' },
            price: { gte: filtered.minPrice, lte: filtered.maxPrice },
            stock: filtered.inStock ? { gt: 0 } : undefined,
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
        where: { id: id },
        omit: {
            category: true
        }
    })
    return product
}
