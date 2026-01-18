'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useCallback } from 'react'
import Image from 'next/image'

import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import {Product} from '@/types/product'

type ProductCarouselItem = Omit<Product, 'images' | 'description' | 'category' | 'stock'>
interface CarouselProps {
    products: ProductCarouselItem[]
}

const Carousel = ({products}: CarouselProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({loop: false, watchDrag: false, startIndex: 2})
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
                            <div key='a' className='shrink-0 bg-white w-52 h-56 m-10 flex flex-col'>
                            <div className="relative w-full h-44">
                                <Image
                                    src={el.thumbnail}
                                    fill
                                    className="object-cover"
                                    alt={el.title}
                                />
                            </div>
                            <span className='text-xl font-semibold my-2 ml-1.5'>{el.title}</span>
                            <span className='text-lg font-bold ml-1.5'>R$: {el.price}</span>
                            </div>
                        )))
                    }
                </div>
            </div>
        <button className='absolute -left-12 bottom-[43%] text-5xl text-center' onClick={scrollPrev}><MdOutlineArrowBackIos/></button>
        <button className='absolute -right-12 bottom-[43%] text-5xl text-center' onClick={scrollNext}><MdOutlineArrowForwardIos/></button>
        </div>
    )
}

export default Carousel