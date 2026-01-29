import 'server-only'

import {fakeStore, jsonDummy, platzi} from '@/types/fakeStores'
import { Product } from '@/types/product'
import {normalizeRating} from '@/lib/utils'

export const cleanedDTO = (data: {fakeStore: fakeStore[], jsonDummy: jsonDummy, platzi: platzi[]}) => {
    const cleanedFakeStore = data.fakeStore.map(el => ({
        thumbnail: el.image,
        rating: normalizeRating(el.rating.rate),
        slug: el.title.toLowerCase().replaceAll(' ', '-'),
        title: el.title,
        category: el.category,
        description: el.description,
        price: Math.round(el.price * 100),
        stock: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
        images: []
    } satisfies Omit<Product, 'id'>))

    const cleanedJsonDummy = data.jsonDummy.products.map(el => ({
        thumbnail: el.thumbnail,
        rating: normalizeRating(el.rating),
        slug: el.title.toLowerCase().replaceAll(' ', '-'),
        title: el.title,
        category: el.category,
        description: el.description,
        price: Math.round(el.price * 100),
        stock: el.stock,
        images: el.images,
    } satisfies Omit<Product, 'id'>))

    const cleanedPlatzi = data.platzi.map(el => ({
        thumbnail: el.images[0],
        rating: Number((Math.random() * 5).toFixed(1)),
        slug: el.slug,
        title: el.title,
        category: el.category.slug,
        description: el.description,
        price: Math.round(el.price * 100),
        stock: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
        images: el.images
    } satisfies Omit<Product, 'id'>))

    const fullDataProducts = [...cleanedFakeStore, ...cleanedJsonDummy, ...cleanedPlatzi]
    const fullDataCategories = fullDataProducts.map(el => ({name: el.category}))
    return {products: fullDataProducts, categories: fullDataCategories}
}
