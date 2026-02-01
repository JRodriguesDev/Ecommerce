import {Product} from '@/types/product'
import {getProduct} from '../actions'
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { 
    FaStar, 
    FaBoxOpen, 
    FaCartPlus, 
    FaHeart, 
    FaBagShopping 
} from "react-icons/fa6"

import { Skeleton } from "@/components/ui/skeleton"

// Importe os novos componentes client
import { Gallery, ActionButtons } from "./productInteractive" 

export const ProductDetails = async ({params}: {params: Promise<{id: string}>}) => {
    const {id} = await params
    const product = await getProduct(id) as Product

    if (!product) return null

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-8">
            {/* LADO ESQUERDO: GALERIA (CLIENT) */}
            <Gallery 
                thumbnail={product.thumbnail} 
                images={product.images} 
                title={product.title} 
            />

            {/* LADO DIREITO: INFORMAÇÕES (SERVER) */}
            <div className="flex flex-col gap-6">
                <div className="space-y-2">
                    <Badge variant="outline" className="text-blue-500 border-blue-500/30 uppercase tracking-widest text-[10px]">
                        {product.category}
                    </Badge>
                    <h1 className="text-3xl md:text-4xl font-black text-zinc-100 tracking-tight leading-none">
                        {product.title}
                    </h1>
                    <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold bg-yellow-500/10 px-2 py-0.5 rounded">
                            <FaStar /> {product.rating.toFixed(1)}
                        </div>
                        <div className="flex items-center gap-2 text-zinc-400 text-xs">
                            <FaBoxOpen /> {product.stock} unidades disponíveis
                        </div>
                    </div>
                </div>

                <Separator className="bg-zinc-800" />

                <div className="space-y-1">
                    <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Melhor preço à vista</span>
                    <div className="text-4xl font-black text-zinc-100 tracking-tighter">
                        {(product.price / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed max-w-prose">
                    {product.description}
                </p>

                {/* AÇÕES (CLIENT) */}
                <ActionButtons productId={product.id} />
            </div>
        </div>
    )
}

export const ProductSkeleton = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-8 animate-pulse">
            {/* Esqueleto da Galeria */}
            <div className="flex flex-col gap-4">
                <Skeleton className="aspect-square w-full rounded-xl bg-zinc-900" />
                <div className="flex gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="w-20 h-20 rounded-md bg-zinc-900" />
                    ))}
                </div>
            </div>

            {/* Esqueleto das Infos */}
            <div className="flex flex-col gap-6">
                <div className="space-y-4">
                    <Skeleton className="h-5 w-24 bg-zinc-900" />
                    <Skeleton className="h-10 w-full bg-zinc-900" />
                    <Skeleton className="h-6 w-40 bg-zinc-900" />
                </div>
                <div className="space-y-2 py-6 border-y border-zinc-800">
                    <Skeleton className="h-4 w-20 bg-zinc-900" />
                    <Skeleton className="h-12 w-48 bg-zinc-900" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-zinc-900" />
                    <Skeleton className="h-4 w-full bg-zinc-900" />
                    <Skeleton className="h-4 w-2/3 bg-zinc-900" />
                </div>
                <div className="flex flex-col gap-3 mt-4">
                    <div className="flex gap-3">
                        <Skeleton className="h-12 flex-1 bg-zinc-900" />
                        <Skeleton className="h-12 w-16 bg-zinc-900" />
                    </div>
                    <Skeleton className="h-12 w-full bg-zinc-900" />
                </div>
            </div>
        </div>
    )
}