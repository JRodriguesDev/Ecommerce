'use server'

import { getProductById } from '@/services/DAL/shop'
import {toggleFavorite, isFavorite} from '@/services/DAL/favorite'
import { redirect } from 'next/navigation'
import {auth} from '@/lib/authjs/auth'
import {toggleCartItem, isCart} from '@/services/DAL/cart'
import { revalidatePath } from 'next/cache'

export const getProductAction = async (id: string) => {
    try {
        // Validação básica de entrada
        if (!id) return null

        const product = await getProductById(id)

        // Se o DAL retornar undefined ou null, tratamos aqui
        if (!product) {
            return null
        }

        return product
    } catch (error) {
        // Faxina: Logamos o erro internamente para debug, 
        // mas não "quebramos" a aplicação para o usuário.
        console.error(`[ACTION ERROR] Falha ao obter produto ${id}:`, error)
        
        // Retornamos null para que o componente decida como reagir (ex: notFound())
        return null
    }
}

export const toggleFavoriteAction = async (productId: string) => {
    const session = await auth()
    if (!session?.user?.id) redirect('/auth/login')
    const data = await toggleFavorite(session.user.id, productId)
    revalidatePath(`/products/${productId}`)
    return data
}

export const checkIsFAvoriteAction = async (userId: string, productId: string) => {
    const data = await isFavorite(userId, productId)
    return data
}

export const toggleCartAction = async (productId: string) => {
    const session = await auth()
    if (!session?.user?.id) redirect('/auth/login')
    await toggleCartItem(session.user.id, productId)
    revalidatePath(`/products/${productId}`)
}

export const checkIsCartAction = async (userId: string, productId: string) => {
    const data = await isCart(userId, productId)
    return data
}
