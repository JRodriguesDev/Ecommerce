'use client'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { ProductCard } from './productCard'
import { Product } from '@/types/product'
import { Skeleton } from "@/components/ui/skeleton"

type ProductCarouselItem = Omit<Product, 'images' | 'description' | 'category' | 'stock'>

interface CarouselProps {
    products: ProductCarouselItem[]
}

export const CarouselSection = ({ products }: CarouselProps) => {
    return (
        <div className="relative w-full px-4 md:px-0">
            <Carousel
                opts={{
                    align: "start",
                    loop: false,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-4"> {/* Gap negativo para compensar o padding do card */}
                    {products.map((el) => (
                        <CarouselItem key={el.id} className="pl-4 basis-auto">
                            <ProductCard el={el} />
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Botões do Shadcn: Eles aparecem melhor no hover ou nas laterais */}
                <div className="hidden md:block">
                    <CarouselPrevious className="-left-12 bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white transition-all" />
                    <CarouselNext className="-right-12 bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white transition-all" />
                </div>
            </Carousel>
        </div>
    )
}

export const CarrouselSkeleton = () => {
    return (
        <div className="flex gap-4 overflow-hidden py-4">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex flex-col gap-3 shrink-0">
                    {/* Skeleton combinando com o tamanho do ProductCard (w-56 h-72) */}
                    <Skeleton className="w-56 h-44 bg-zinc-900 rounded-t-xl" />
                    <div className="p-2 space-y-2">
                        <Skeleton className="h-4 w-40 bg-zinc-900" />
                        <Skeleton className="h-6 w-24 bg-zinc-900" />
                    </div>
                </div>
            ))}
        </div>
    )
}