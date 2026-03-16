'use client'

import { useState, useMemo } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FaBagShopping, FaHeart, FaCartPlus, FaRegHeart  } from "react-icons/fa6"
import { cn } from "@/lib/utils"
import {toggleFavoriteAction, toggleCartAction} from '../actions'
import {GalleryProps} from '../types'
import { useOptimistic, useTransition } from "react"
import {useSession} from 'next-auth/react'
import { useRouter } from "next/navigation"

export const Gallery = ({ thumbnail, images, title }: GalleryProps) => {
    const [activeImage, setActiveImage] = useState(thumbnail)
    
    // Faxina: Remove duplicatas caso o thumbnail já esteja no array de images
    const allImages = useMemo(() => {
        return Array.from(new Set([thumbnail, ...images])).filter(Boolean)
    }, [thumbnail, images])

    return (
        <div className="flex flex-col-reverse lg:flex-row gap-4 h-full">
            {/* MINIATURAS */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px] no-scrollbar shrink-0 pb-2 lg:pb-0">
                {allImages.map((img, i) => (
                    <button 
                        key={`${img}-${i}`}
                        onMouseEnter={() => setActiveImage(img)}
                        onClick={() => setActiveImage(img)}
                        className={cn(
                            "relative size-16 lg:size-20 rounded-xl border-2 overflow-hidden bg-white shrink-0 transition-all duration-300",
                            activeImage === img 
                                ? "border-blue-600 ring-4 ring-blue-600/10 scale-90" 
                                : "border-zinc-800/50 opacity-60 hover:opacity-100 hover:border-zinc-600"
                        )}
                    >
                        <Image 
                            src={img} 
                            alt={`${title} view ${i}`} 
                            fill 
                            className="object-contain p-1.5"
                            sizes="80px"
                        />
                    </button>
                ))}
            </div>

            {/* IMAGEM PRINCIPAL */}
            <Card className="relative flex-1 aspect-square lg:aspect-[4/5] overflow-hidden bg-white border-zinc-800/50 shadow-2xl shadow-black/40 group cursor-zoom-in">
                <Image 
                    src={activeImage} 
                    alt={title} 
                    fill 
                    className="object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                />
                
                <div className="absolute bottom-4 right-4 bg-zinc-950/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity border border-white/10">
                    Hover your mouse to zoom in.
                </div>
            </Card>
        </div>
    )
}

export const ActionButtons = ({ productId, isFavorite, isCart }: { productId: string, isFavorite: boolean, isCart: boolean }) => {
  const [isPending, startTransition] = useTransition()
  const {update} = useSession()
  const router = useRouter()

  // Definindo como o estado deve se comportar na "previsão"
  const [optimisticCart, setOptimisticCart] = useOptimistic(isCart, (state) => !state)
  const [optimisticFavorite, setOptimisticFavorite] = useOptimistic(isFavorite, (state) => !state)

  const handleAction = (type: 'cart' | 'favorite' | 'buy') => {
    startTransition(async () => {
      try {

        switch (type) {
          case 'cart':
            setOptimisticCart(!optimisticCart) // Atualiza UI na hora
            await toggleCartAction(productId)
            await update({countUpdate: true})
            break
          case 'favorite':
            setOptimisticFavorite(!optimisticFavorite) // Atualiza UI na hora
            await toggleFavoriteAction(productId)
            break
          case 'buy':
            if (!isCart) {
              await toggleCartAction(productId)
              await update({countUpdate: true})
            }
            router.push('/checkout/cart')
            break
        }
      } catch (error) {
      }
    })
  }

  return (
    <div className="flex flex-col gap-3 mt-4">
      <div className="flex gap-3">
        <Button 
          onClick={() => handleAction('buy')}
          size="lg" 
          className="flex-[3] bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2 h-14 active:scale-95"
          disabled={isPending}
        >
          <FaBagShopping className="size-5" /> Buy Now
        </Button>
        
        <Button 
          onClick={() => handleAction('favorite')}
          disabled={isPending} // Impede cliques múltiplos enquanto processa
          size="lg" 
          variant="outline" 
          className="flex-1 border-zinc-700 hover:bg-zinc-800 text-zinc-300 h-14"
        >
          {optimisticFavorite ? (
            <FaHeart className="size-5 text-red-500" />
          ) : (
            <FaRegHeart className="size-5 text-zinc-300" />
          )}
        </Button>
      </div>

      <Button 
        onClick={() => handleAction('cart')}
        disabled={isPending} // Bloqueia o botão enquanto a Action roda
        variant="secondary" 
        className="w-full gap-2 font-bold bg-zinc-800/50 hover:bg-zinc-800 text-zinc-100 h-14 border border-zinc-700/50 transition-all"
      >
        <FaCartPlus className="size-5" /> 
        {optimisticCart ? "Remove from Cart" : "Add to Cart"}
      </Button>
    </div>
  )
}