'use client'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { ProductCard } from './productCard'
import { Skeleton } from "@/components/ui/skeleton"
import {CarouselProps} from  '../types'

// Faxina na Tipagem: Definindo exatamente o que o Card consome

export const CarouselSection = ({ products }: CarouselProps) => {
    // Se não houver produtos, evitamos renderizar o container vazio
    if (!products?.length) return (
        <div className="h-40 flex items-center justify-center text-zinc-500 italic">
            No products found in this category.
        </div>
    )

    return (
        <div className="relative w-full">
            <Carousel
                opts={{
                    align: "start",
                    loop: false,
                    dragFree: true, // Melhora a sensação no mobile
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-4">
                    {products.map((el) => (
                        <CarouselItem 
                            key={el.id} 
                            /* Faxina no Responsivo: 1 card mobile, 3 tablet, 4+ desktop */
                            className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                        >
                            <ProductCard el={el} />
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Botões: Adicionado um check para não aparecerem se houver poucos itens */}
                {products.length > 4 && (
                    <div className="hidden xl:block">
                        <CarouselPrevious className="-left-12 bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all" />
                        <CarouselNext className="-right-12 bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all" />
                    </div>
                )}
            </Carousel>
        </div>
    )
}

export const CarrouselSkeleton = () => {
    return (
        <div className="flex gap-4 overflow-hidden py-4">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex flex-col gap-3 shrink-0">
                    <Skeleton className="w-[240px] h-48 bg-zinc-900/50 rounded-xl" />
                    <div className="p-2 space-y-2">
                        <Skeleton className="h-4 w-40 bg-zinc-900/50" />
                        <Skeleton className="h-6 w-24 bg-zinc-900/50" />
                    </div>
                </div>
            ))}
        </div>
    )
}