import 'server-only'

import prisma from '@/lib/prisma'
import {verifySession} from './user'
import { Product } from '@/types/product'
import { Category } from '@/types/category'

type addProduct = Omit<Product, 'id'>
type addCategory = Omit<Category, 'id'>

export const syncSeedWithDatabase= async (data: {products: addProduct[], categories: addCategory[]}) => {
    try {
        const completed = await prisma.$transaction( async (prisma) => {
            const products = await prisma.product.createMany({data: data.products})
            const categories = await prisma.category.createMany({data: data.categories, skipDuplicates: true})
            return {products, categories}
        })
        return completed
    } catch(err) {
        console.log('Erro in Database')
    }
}