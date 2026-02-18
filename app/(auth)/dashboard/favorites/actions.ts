'use server'

import {getFavorites, toggleFavorite} from '@/services/DAL/favorite'

export const getFavoritesProductsAction = async (userId: string) => {
    const data = await getFavorites(userId)
    return data
}

export const toggleFavoriteAction = async (userId: string, productId: string) => {
    await toggleFavorite(userId, productId)
}