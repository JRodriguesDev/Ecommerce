import Image from "next/image"
import { useState } from "react"
import {Product as typeProduct} from '@/types/product'

type ProductCarouselItem = Omit<typeProduct, 'images' | 'description' | 'category' | 'stock'>

export const Product = ({el}: {el: ProductCarouselItem}) => {
    const [hasError, setHasError] = useState(false)
    if (hasError) return null

    return (
        <div className='shrink-0 bg-white w-56 h-56 m-10 flex flex-col cursor-pointer'>
            <div className="relative w-full h-44">
                <Image  
                    src={el.thumbnail}
                    fill
                    className="object-cover"
                    onError={() => setHasError(true)}
                    alt={el.title}
                />
            </div>
            <span title={el.title} className='text-xl font-semibold my-2 ml-1.5 line-clamp-1'>{el.title}</span>
            <span className='text-lg font-bold ml-1.5'>R$: {el.price / 100}</span>
        </div>
    )
}

export default Product