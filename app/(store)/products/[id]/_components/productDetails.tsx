import {Product} from '@/types/product'
import {getProduct} from '../actions'
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
    FaStar, 
    FaBoxOpen, 
} from "react-icons/fa6"

import { Skeleton } from "@/components/ui/skeleton"
import { notFound } from 'next/navigation'
import {checkIsFAvoriteAction} from '../actions'
import {auth} from '@/lib/authjs/auth'

// Importe os novos componentes client
import { Gallery, ActionButtons } from "./productInteractive" 

export const ProductDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const product = await getProduct(id) as Product
    const session = await auth()
    const isFavorite = session?.user ? await checkIsFAvoriteAction(session!.user!.id as string, product.id) : false
    // Faxina: Em vez de null, usamos notFound() para uma UX melhor
    if (!product) notFound()

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-16 py-8 items-start">
            
            {/* LADO ESQUERDO: GALERIA */}
            <div className="lg:col-span-7 w-full">
                <Gallery 
                    thumbnail={product.thumbnail} 
                    images={product.images} 
                    title={product.title} 
                />
            </div>

            {/* LADO DIREITO: INFOS (Sticky) */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-28">
                <div className="space-y-4">
                    <Badge variant="outline" className="text-blue-500 border-blue-500/30 uppercase tracking-[0.2em] text-[10px] font-bold px-3">
                        {product.category}
                    </Badge>
                    
                    <h1 className="text-3xl md:text-4xl xl:text-5xl font-black text-zinc-100 tracking-tight leading-[1.1]">
                        {product.title}
                    </h1>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-yellow-500 text-sm font-bold bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                            <FaStar className="size-3" /> {product.rating?.toFixed(1) || "0.0"}
                        </div>
                        <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
                            <FaBoxOpen className="text-zinc-500" /> {product.stock} em estoque
                        </div>
                    </div>
                </div>

                <Separator className="bg-zinc-800/50" />

                <div className="space-y-1">
                    <span className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest">Preço à vista</span>
                    <div className="text-4xl xl:text-5xl font-black text-zinc-100 tracking-tighter flex items-baseline gap-1">
                        <span className="text-xl font-bold text-blue-500">R$</span>
                        {((product.price || 0) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                </div>

                <div className="bg-zinc-900/30 p-4 rounded-xl border border-zinc-800/50 backdrop-blur-sm">
                    <h4 className="text-zinc-200 text-xs font-bold uppercase mb-2 tracking-wider">Descrição</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        {product.description}
                    </p>
                </div>

                {/* AÇÕES (CLIENT COMPONENT) */}
                <div className="mt-auto">
                    <ActionButtons productId={product.id} isFavorite={isFavorite} />
                </div>
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