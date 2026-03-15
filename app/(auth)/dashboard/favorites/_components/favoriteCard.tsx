'use client'

import { LuTrash2, LuShoppingCart } from "react-icons/lu"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import Link from "next/link"
import Image from "next/image"
import { FaStar } from "react-icons/fa6"
import { toggleFavoriteAction } from '../actions'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { FavoriteCardProps } from '../types'


export const FavoriteCard = ({
    id,
    thumbnail,
    rating,
    slug,
    title,
    price,
    stock,
    onRemove
}: FavoriteCardProps) => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const handlerRemoveFavorite = () => {
        // Usamos startTransition para envolver a lógica assíncrona
        startTransition(async () => {
            try {
                // 1. Executa a Action no servidor
                await toggleFavoriteAction(id)

                // 2. Avisa ao Next.js para buscar os dados atualizados 
                // sem recarregar a página (faz o refresh apenas do conteúdo do servidor)
                router.refresh()

            } catch (error) {
                console.error("Erro ao remover favorito:", error)
            }
        })
    }

    return (
        <Card className="bg-zinc-900/20 border-zinc-800 hover:border-zinc-700 transition-all group overflow-hidden flex flex-col">
            {/* ÁREA DA IMAGEM */}
            <div className="relative aspect-square overflow-hidden bg-zinc-900">
                <Link href={`/products/${id}`}>
                    <Image
                        src={thumbnail}
                        alt={title}
                        fill
                        className="object-contain p-4 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                    />
                </Link>

                {/* BOTÃO REMOVER */}
                <button
                    onClick={() => handlerRemoveFavorite()}
                    className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-md rounded-lg text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all z-10"
                >
                    {isPending ? (
                        <div className="size-4 border-2 border-red-500 border-t-transparent animate-spin rounded-full" />
                    ) : (
                        <LuTrash2 className="size-4" />
                    )}
                </button>

                {/* BADGE DE ESTOQUE (Opcional) */}
                {stock <= 5 && stock > 0 && (
                    <span className="absolute bottom-3 left-3 bg-orange-500/10 text-orange-500 text-[9px] font-bold px-2 py-1 rounded border border-orange-500/20 backdrop-blur-sm">
                        ÚLTIMAS {stock} UNIDADES
                    </span>
                )}
            </div>

            <CardContent className="p-4 flex-1 space-y-2">
                {/* RATING */}
                <div className="flex items-center gap-1 text-yellow-500">
                    <FaStar className="size-3 fill-current" />
                    <span className="text-[10px] font-bold text-zinc-400">{rating.toFixed(1)}</span>
                </div>

                <Link href={`/products/${id}`}>
                    <h3 className="text-sm font-bold text-zinc-200 line-clamp-2 leading-snug group-hover:text-blue-400 transition-colors">
                        {title}
                    </h3>
                </Link>

                <p className="text-lg font-black text-zinc-100 italic">
                    {(price / 100).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })}
                </p>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Button
                    disabled={stock === 0}
                    className="w-full bg-zinc-100 hover:bg-white text-black font-black text-[10px] uppercase tracking-tighter gap-2 h-10 disabled:bg-zinc-800 disabled:text-zinc-500"
                >
                    <LuShoppingCart className="size-4" />
                    {stock > 0 ? "Adicionar ao Carrinho" : "Esgotado"}
                </Button>
            </CardFooter>
        </Card>
    )
}

export const FavoriteCardSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="bg-zinc-900/20 border-zinc-800 overflow-hidden flex flex-col pointer-events-none">
                    {/* ÁREA DA IMAGEM */}
                    <Skeleton className="aspect-square w-full bg-zinc-800/40 rounded-none" />

                    <CardContent className="p-4 flex-1 space-y-3">
                        {/* RATING (O detalhe que faltava) */}
                        <div className="flex items-center gap-1">
                            <Skeleton className="size-3 rounded-full bg-zinc-800/60" />
                            <Skeleton className="h-3 w-6 bg-zinc-800/60" />
                        </div>

                        {/* TÍTULO */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full bg-zinc-800/80" />
                            <Skeleton className="h-4 w-[85%] bg-zinc-800/80" />
                        </div>

                        {/* PREÇO */}
                        <Skeleton className="h-7 w-28 bg-zinc-800" />
                    </CardContent>

                    <CardFooter className="p-4 pt-0">
                        {/* BOTÃO ADICIONAR AO CARRINHO */}
                        <Skeleton className="h-10 w-full bg-zinc-800" />
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}