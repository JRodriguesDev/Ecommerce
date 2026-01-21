'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useCallback} from 'react'
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import {Product} from '@/app/(shop)/shop/_components/product'
import {Product as typeProduct} from '@/types/product'

type ProductCarouselItem = Omit<typeProduct, 'images' | 'description' | 'category' | 'stock'>
interface CarouselProps {
    products: ProductCarouselItem[]
}

export const Carousel = ({products}: CarouselProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({loop: false, watchDrag: false, startIndex: 0})
    useEffect(() => {
        if (emblaApi) {
        console.log(emblaApi.slideNodes()) 
        }
    }, [emblaApi])

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])
    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    return (
        <div className='relative'>
            <div className="bg-blue-900 w-full h-80 overflow-hidden rounded-lg" ref={emblaRef}>
                <div className="flex flex-row">
                    {
                        products.map((el => (
                            <Product key={el.id} el={el}/>
                        )))
                    }
                </div>
            </div>
        <button className='absolute -left-12 bottom-[43%] text-5xl text-center' onClick={scrollPrev}><MdOutlineArrowBackIos/></button>
        <button className='absolute -right-12 bottom-[43%] text-5xl text-center' onClick={scrollNext}><MdOutlineArrowForwardIos/></button>
        </div>
    )
}

export const CarrouselSkeleton = () => {
    return (
        <>
            {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full h-80 rounded-lg bg-grau-800 animate-pulse flex flex-col gap-2 p-4">
                    <div className="w-full h-44 "/>
                    <div className="w-3/4 h-6 bg-gray-300 rounded "/>
                    <div className="w-1/2 h-6 bg-gray-300 rounded "/>
                </div>
            ))}
        </>
    )
}