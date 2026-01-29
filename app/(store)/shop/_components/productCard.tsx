'use client'

import Image from "next/image"
import { useState } from "react"
import { Product } from '@/types/product'
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type ProductCarouselItem = Omit<Product, 'images' | 'description' | 'category' | 'stock'>

export const ProductCard = ({ el }: { el: ProductCarouselItem }) => {
    const [hasError, setHasError] = useState(false)

    if (hasError) return null

    return (
        <div className="shrink-0 m-4 transition-transform duration-300 hover:scale-105">
            <Card className="w-56 h-80 overflow-hidden border-zinc-800 bg-zinc-900/40 cursor-pointer group p-0">
                <CardContent className="p-0 flex flex-col h-full">
                    
                    {/* Área da Imagem com Badge de Rating */}
                    <div className="relative w-full h-44 bg-zinc-950 overflow-hidden">
                        {/* BADGE DE RATING: Posicionada no canto superior esquerdo */}
                        {el.rating && (
                            <Badge 
                                variant="secondary" 
                                className="absolute top-2 left-2 z-10 bg-zinc-950/80 text-yellow-500 border-zinc-700 flex items-center gap-1 backdrop-blur-sm"
                            >
                                <Star className="w-3 h-3 fill-yellow-500" />
                                <span className="text-[10px] font-bold">{el.rating.toFixed(1)}</span>
                            </Badge>
                        )}

                        <Image  
                            src={el.thumbnail}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            onError={() => setHasError(true)}
                            alt={el.title}
                            sizes="224px"
                        />
                    </div>

                    {/* Área de Texto */}
                    <div className="p-4 flex flex-col justify-between flex-1">
                        <h3 
                            title={el.title} 
                            className="text-zinc-100 font-semibold text-sm line-clamp-2 leading-tight tracking-tight"
                        >
                            {el.title}
                        </h3>
                        
                        <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-1">
                                <span className="text-blue-500 text-xs font-bold">R$</span>
                                <span className="text-zinc-100 text-xl font-black tracking-tighter">
                                    {(el.price / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </span>
                            </div>

                            {/* Opcional: Um ícone de seta ou "+" para o usuário saber que pode clicar */}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            </div>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}