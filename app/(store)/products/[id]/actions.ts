import {getProductById} from '@/services/DAL/shop'

export const getProduct = async (id: string) => {
    const product = await getProductById(id)

    return product
}