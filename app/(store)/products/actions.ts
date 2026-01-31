import {parseProductFiltersDTO} from '@/services/DTO/shop'
import { getFilteredProducts } from '@/services/DAL/shop'
import { ParamsFilter } from '@/types/params'

export const getFilteredProductsAction = async (params: ParamsFilter) => {
    const cleanParams = parseProductFiltersDTO(params)
    const filteredProducts = await getFilteredProducts(cleanParams)
    return filteredProducts
}