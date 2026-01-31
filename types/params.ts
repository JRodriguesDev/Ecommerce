export interface ParamsFilter {
    cat?: string
    q?: string
    minPrice?: number
    maxPrice?: number
    inStock?: string | boolean
    onSale?: string | boolean
    selectedRatings?: string
    rating?: string[]
}