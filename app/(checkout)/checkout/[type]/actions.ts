'use server'

import {auth} from '@/lib/authjs/auth'
import {getCartProducts} from '@/services/DAL/cart'
import {createSession} from '@/services/stripe/session'
import {productsModeDTO} from '@/services/DTO/stripe'
import { redirect } from 'next/navigation'
import {Product} from '@/types/product'

export const cartProductsAction = async () => {
    const session = await auth()
    if (!session?.user?.id) redirect('/auth/login')
    const products = await getCartProducts(session.user.id)
    return products
}

export const createCheckoutAction = async (products: Product[], type: string) => {
    const stripeData = productsModeDTO(products)
    return await createSession(stripeData, type)
}