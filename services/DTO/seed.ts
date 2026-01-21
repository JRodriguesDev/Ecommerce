import 'server-only'

import {fakeStore, jsonDummy, platzi} from '@/types/fakeStores'
import { Product } from '@/types/product'

export const cleanedDTO = (data: {fakeStore: fakeStore[], jsonDummy: jsonDummy, platzi: platzi[]}) => {
    const cleanedFakeStore = data.fakeStore.map(el => ({
        thumbnail: el.image,
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
        slug: el.title.toLowerCase().replaceAll(' ', '-'),
        title: el.title,
        category: el.category,
        description: el.description,
        price: Math.round(el.price * 100),
        stock: el.stock,
        images: el.images,
    } satisfies Omit<Product, 'id'>))

    const cleanedPlatzi = data.platzi.map(el => ({
        thumbnail: el.title,
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
