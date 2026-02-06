'use server'

import { parseProductFiltersDTO } from '@/services/DTO/shop'
import { getFilteredProducts } from '@/services/DAL/shop'
import { ParamsFilter } from '@/types/params'

export const getFilteredProductsAction = async (params: ParamsFilter) => {
    try {
        // 1. Limpeza e Validação via DTO
        // Garante que 'price' seja número, 'category' seja string válida, etc.
        const cleanParams = parseProductFiltersDTO(params)

        // 2. Busca na DAL
        const filteredProducts = await getFilteredProducts(cleanParams)

        // 3. Fallback de Segurança
        // Se a DAL retornar null por algum motivo, entregamos um array vazio
        return filteredProducts ?? []
        
    } catch (error) {
        // Log interno para você debugar, sem expor ao cliente
        console.error("Error in getFilteredProductsAction:", error)
        
        // Retorno seguro: a interface apenas mostrará "Nenhum produto encontrado"
        return []
    }
}