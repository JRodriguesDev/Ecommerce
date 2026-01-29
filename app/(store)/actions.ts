import {getCategories} from '@/services/DAL/shop'

export const allCategories = async () => {
    return await getCategories()
}