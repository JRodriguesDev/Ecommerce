'use server'

import { getCartProductsDB, updateProductQuantityDB, toggleCartItemDB } from '@/services/DAL/cart'
import { auth } from '@/lib/authjs/auth'
import { revalidatePath } from 'next/cache'

export const getProductsAction = async () => {
    const session = await auth()
    const userId = session!.user.id as string
    const products = await getCartProductsDB(userId)
    return products
}

export const updateCartQuantityAction = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return null
    const session = await auth()
    await updateProductQuantityDB(session!.user!.id!, productId, newQuantity)
    revalidatePath(`/dashboard/cart`)
}

export const removeCartProductAction = async (productId: string) => {
    const session = await auth()
    await toggleCartItemDB(session!.user!.id!, productId)
}