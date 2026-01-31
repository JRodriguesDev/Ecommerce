import 'server-only'

import {ParamsFilter} from '@/types/params'

export const parseProductFiltersDTO = (params: ParamsFilter) => {
    const filter = {
        cat: params.cat || undefined,
        q: params.q || undefined,
        minPrice: params.minPrice ? Math.round(params.minPrice * 100) : undefined,
        maxPrice: params.maxPrice ? Math.round(params.maxPrice * 100) : undefined,
        inStock: params.inStock === 'true' || params.inStock === true ? true : undefined,
        onSale: params.onSale === 'true' || params.onSale === true ? true : undefined,
        rating: (typeof params.selectedRatings === 'string' && params.selectedRatings.length > 0)
            ? params.selectedRatings.split(',')
            : undefined
    } satisfies ParamsFilter
    return filter
}