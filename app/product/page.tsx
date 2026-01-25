'use client'

import { useSearchParams } from "next/navigation"

const Product = () => {
    const params = useSearchParams()
    const filters = {
        query: params.get('q') || undefined,
        category: params.get('cat') || undefined
    }


    return (
        <div>
            <p>/product</p>
        </div>
    )
}

export default Product