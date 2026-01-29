'use client'

import Image from "next/image"
import { useState } from "react"
import { Product } from '@/types/product'
import { Card, CardContent } from "@/components/ui/card"

type ProductCarouselItem = Omit<Product, 'images' | 'description' | 'category' | 'stock'>

export const ProductCard = ({ el }: { el: ProductCarouselItem }) => {
    const [hasError, setHasError] = useState(false)

    if (hasError) return null

    return (
        <div className="shrink-0 m-4 transition-transform duration-300 hover:scale-105">
            {/* 1. Removi qualquer padding lateral do Card e garanti overflow-hidden */}
            <Card className="w-56 h-72 overflow-hidden border-zinc-800 bg-zinc-900/40 cursor-pointer group p-0">
                
                {/* 2. MUITO IMPORTANTE: CardContent do Shadcn tem padding p-6 por padrão. 
                       Forçamos p-0 para a imagem encostar nas bordas. */}
                <CardContent className="p-0 flex flex-col h-full">
                    
                    {/* 3. Área da Imagem: h-44 está ótimo. 
                           Removi o rounded-t-xl daqui porque o overflow-hidden do Card já faz o serviço. */}
                    <div className="relative w-full h-44 bg-zinc-950 overflow-hidden">
                        <Image  
                            src={el.thumbnail}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            onError={() => setHasError(true)}
                            alt={el.title}
                            sizes="224px"
                            priority={false}
                        />
                    </div>

                    {/* 4. Área de Texto: Aqui sim voltamos com o padding (p-3 ou p-4) 
                           para o texto não encostar nas bordas. */}
                    <div className="p-4 flex flex-col justify-between flex-1">
                        <h3 
                            title={el.title} 
                            className="text-zinc-100 font-semibold text-sm line-clamp-2 leading-tight tracking-tight"
                        >
                            {el.title}
                        </h3>
                        
                        <div className="flex items-center gap-1 mt-auto">
                            <span className="text-blue-500 text-xs font-bold">R$</span>
                            <span className="text-zinc-100 text-xl font-black tracking-tighter">
                                {(el.price / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default ProductCard