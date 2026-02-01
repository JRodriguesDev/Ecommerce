'use client'

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FaBagShopping, FaHeart, FaCartPlus } from "react-icons/fa6"
import { cn } from "@/lib/utils"

interface GalleryProps {
    thumbnail: string
    images: string[]
    title: string
}
export const Gallery = ({ thumbnail, images, title }: GalleryProps) => {
    const [activeImage, setActiveImage] = useState(thumbnail)
    const allImages = [thumbnail, ...images]

    return (
        <div className="flex flex-col-reverse lg:flex-row gap-4">
            {/* MINIATURAS: Embaixo no mobile, Lado no Desktop */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px] scrollbar-hide shrink-0">
                {allImages.map((img, i) => (
                    <button 
                        key={i}
                        onMouseEnter={() => setActiveImage(img)} // Troca ao passar o mouse (opcional, mas pro)
                        onClick={() => setActiveImage(img)}
                        className={cn(
                            "relative size-16 lg:size-20 rounded-xl border-2 overflow-hidden bg-white shrink-0 transition-all duration-200",
                            activeImage === img 
                                ? "border-blue-600 ring-2 ring-blue-600/20 scale-95" 
                                : "border-zinc-800/50 opacity-50 hover:opacity-100 hover:border-zinc-700"
                        )}
                    >
                        <Image 
                            src={img} 
                            alt={`${title}-${i}`} 
                            fill 
                            className="object-contain p-1.5" 
                        />
                    </button>
                ))}
            </div>

            {/* IMAGEM PRINCIPAL */}
            <Card className="relative flex-1 h-200 aspect-square lg:aspect-[4/5] overflow-hidden bg-white border-zinc-800 shadow-2xl shadow-black/20 group">
                <Image 
                    src={activeImage} 
                    alt={title} 
                    fill 
                    className="object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                    priority
                />
                
                {/* Badge de Zoom ou Dica (Opcional) */}
                <div className="absolute bottom-4 right-4 bg-zinc-950/20 backdrop-blur-md px-2 py-1 rounded text-[10px] text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    Hover to zoom
                </div>
            </Card>
        </div>
    )
}

export const ActionButtons = ({ productId }: { productId: string }) => {
    return (
        <div className="flex flex-col gap-3 mt-4">
            <div className="flex gap-3">
                <Button size="lg" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2">
                    <FaBagShopping /> Comprar Agora
                </Button>
                <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-zinc-700 hover:bg-zinc-800 text-zinc-300"
                    onClick={() => console.log("Favoritado:", productId)}
                >
                    <FaHeart />
                </Button>
            </div>
            <Button 
                variant="secondary" 
                className="w-full gap-2 font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-100"
                onClick={() => console.log("Adicionado ao carrinho:", productId)}
            >
                <FaCartPlus /> Adicionar ao Carrinho
            </Button>
        </div>
    )
}