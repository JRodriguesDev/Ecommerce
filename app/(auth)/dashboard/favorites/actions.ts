'use server'

import { getFavoritesDB, toggleFavoriteDB } from '@/services/DAL/favorite'
import { auth } from '@/lib/authjs/auth'
import { redirect } from 'next/navigation'

export const getFavoritesProductsAction = async () => {
    const session = await auth()
    if (!session?.user.id) redirect('/auth/login')
    const userId = session.user.id
    const data = await getFavoritesDB(userId)
    return data
}

export const toggleFavoriteAction = async (productId: string) => {
    const session = await auth()
    if (!session?.user.id) redirect('/auth/login')
    const userId = session.user.id
    await toggleFavoriteDB(userId, productId)
}