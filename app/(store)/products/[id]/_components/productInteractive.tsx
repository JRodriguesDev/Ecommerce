'use client'

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FaBagShopping, FaHeart, FaCartPlus } from "react-icons/fa6"

interface GalleryProps {
    thumbnail: string
    images: string[]
    title: string
}

export const Gallery = ({ thumbnail, images, title }: GalleryProps) => {
    // A primeira imagem é sempre a thumbnail
    const [activeImage, setActiveImage] = useState(thumbnail)
    const allImages = [thumbnail, ...images]

    return (
        <div className="flex flex-col gap-4">
            <Card className="relative aspect-square overflow-hidden bg-white border-zinc-800 p-8">
                <Image 
                    src={activeImage} 
                    alt={title} 
                    fill 
                    className="object-contain transition-all duration-300"
                    priority
                />
            </Card>
            
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {allImages.map((img, i) => (
                    <button 
                        key={i}
                        onClick={() => setActiveImage(img)}
                        className={`relative w-20 h-20 rounded-md border-2 overflow-hidden bg-white shrink-0 transition-all ${
                            activeImage === img ? 'border-blue-600 scale-105' : 'border-zinc-800 opacity-60'
                        }`}
                    >
                        <Image src={img} alt={`${title}-${i}`} fill className="object-contain p-1" />
                    </button>
                ))}
            </div>
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