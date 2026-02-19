'use client'

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { MdOutlineArrowForwardIos } from "react-icons/md"

// Reaproveitando a tipagem que definimos no Carousel para consistência
import { ProductCarouselItem } from "../types"

export const ProductCard = ({ el }: { el: ProductCarouselItem }) => {
    return (
        <Link href={`/products/${el.id}`} className="block group">
            <Card className="w-56 h-80 overflow-hidden border-zinc-800 bg-zinc-900/40 p-0 transition-all duration-300 group-hover:border-zinc-700 group-hover:bg-zinc-900/60 shadow-xl">
                <CardContent className="p-0 flex flex-col h-full">
                    
                    {/* Área da Imagem */}
                    <div className="relative w-full h-44 bg-zinc-100 overflow-hidden">
                        {el.rating && (
                            <Badge 
                                variant="secondary" 
                                className="absolute top-2 left-2 z-10 bg-zinc-950/80 text-yellow-500 border-zinc-700 flex items-center gap-1 backdrop-blur-sm px-1.5 py-0"
                            >
                                <Star className="w-2.5 h-2.5 fill-yellow-500" />
                                <span className="text-[10px] font-bold">{el.rating.toFixed(1)}</span>
                            </Badge>
                        )}

                        <Image  
                            src={el.thumbnail}
                            fill
                            className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-110"
                            alt={`Photo of ${el.title}`}
                            sizes="224px"
                        />
                    </div>

                    {/* Área de Texto e Preço */}
                    <div className="p-4 flex flex-col flex-1 justify-between gap-2">
                        <h3 className="text-zinc-100 font-semibold text-sm line-clamp-2 leading-tight tracking-tight group-hover:text-blue-400 transition-colors">
                            {el.title}
                        </h3>
                        
                        <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-1">
                                <span className="text-blue-500 text-[10px] font-bold">R$</span>
                                <span className="text-zinc-100 text-xl font-black tracking-tighter">
                                    {(el.price / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </span>
                            </div>

                            {/* A Seta agora é apenas visual, o Link envolve o card */}
                            <div 
                                className="flex items-center justify-center size-8 rounded-full bg-zinc-800 text-zinc-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-lg group-hover:translate-x-1"
                                aria-hidden="true"
                            >
                                <MdOutlineArrowForwardIos className="size-3.5" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}