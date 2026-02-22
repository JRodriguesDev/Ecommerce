'use server'

import {getCartProducts, updateProductQuantity, toggleCartItem} from '@/services/DAL/cart'
import {auth} from '@/lib/authjs/auth'
import { revalidatePath } from 'next/cache'

export const getProductsAction = async (userId: string) => {
    const products = await getCartProducts(userId)
    return products
}

export const updateCartQuantityAction = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return null
    const session = await auth()
    await updateProductQuantity(session!.user!.id!, productId, newQuantity)
    revalidatePath(`/dashboard/cart`)
}

export const removeCartProductAction = async (productId: string) => {
    const session = await auth()
    await toggleCartItem(session!.user!.id!, productId)
}