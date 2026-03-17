import {fakeStore, jsonDummy, platzi} from '@/types/fakeStores'
import { Product } from '@/types/product'
import {normalizeRating} from '@/lib/utils'
import prisma from '../index'
import { revalidateTag } from 'next/cache'

export const productsSeed = async () => {
    console.log('Fetching Products...')
    const [resFake, resDummy, resPlatzi] = await Promise.all([
        fetch('https://fakestoreapi.com/products'),
        fetch('https://dummyjson.com/products?limit=194'),
        fetch('https://api.escuelajs.co/api/v1/products')
    ])
    const [fakeData, dummyData, platziData] = await Promise.all([
        resFake.json() as Promise<fakeStore[]>,
        resDummy.json() as Promise<jsonDummy>,
        resPlatzi.json() as Promise<platzi[]>
    ])
    console.log('formating data...')
    const cleanedFakeStore = fakeData.map(el => ({
            thumbnail: el.image,
            rating: normalizeRating(el.rating.rate),
            slug: el.title.toLowerCase().replaceAll(' ', '-'),
            title: el.title,
            category: el.category,
            description: el.description,
            price: Math.min(Math.round(el.price * 100), 2000000000),
            stock: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
            images: []
        } satisfies Omit<Product, 'id'>))
    const cleanedJsonDummy = dummyData.products.map(el => ({
            thumbnail: el.thumbnail,
            rating: normalizeRating(el.rating),
            slug: el.title.toLowerCase().replaceAll(' ', '-'),
            title: el.title,
            category: el.category,
            description: el.description,
            price: Math.min(Math.round(el.price * 100), 2000000000),
            stock: el.stock,
            images: el.images,
        } satisfies Omit<Product, 'id'>))
    const cleanedPlatzi = platziData.map(el => ({
            thumbnail: el.images[0],
            rating: Number((Math.random() * 5).toFixed(1)),
            slug: el.slug,
            title: el.title,
            category: el.category.slug,
            description: el.description,
            price: Math.min(Math.round(el.price * 100), 2000000000),
            stock: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
            images: el.images
        } satisfies Omit<Product, 'id'>))
        const fullDataProducts = [...cleanedFakeStore, ...cleanedJsonDummy, ...cleanedPlatzi]
        const fullDataCategories = fullDataProducts.map(el => ({name: el.category}))
        try {
            const result = await prisma.$transaction( async (prisma) => {
                const hasProducts = await prisma.product.count()
                if (hasProducts > 0) {
                    console.log('✅ Products already synced. Skipping...')
                    return {skipped: true}
                }
                console.log('🚀 Syncing database...');
                const products = await prisma.product.createMany({data: fullDataProducts})
                const categories = await prisma.category.createMany({data: fullDataCategories, skipDuplicates: true})
                revalidateTag('low-stock-key', 'max')
                revalidateTag('rating-products-key', 'max')
                revalidateTag('categories-key', 'max')
                return {products, categories}
            })
            if (result.skipped) {
                console.log('Skipped Products Sync')
            } else console.log('✨ Sync success:', result);
        } catch(err) {
            console.error('❌ Error in Database:', err);
        }
        finally {
            await prisma.$disconnect()
        }
}