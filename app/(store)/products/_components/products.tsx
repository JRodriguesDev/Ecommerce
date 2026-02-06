import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardFooter, CardContent } from "@/components/ui/card"
import {Product} from '@/types/product'
import {getFilteredProductsAction} from '../actions'
import {ParamsFilter} from '@/types/params'
import { FaStar, FaBoxOpen } from "react-icons/fa6"
import { LuSearchX } from "react-icons/lu";
import { MdOutlineArrowForwardIos } from "react-icons/md"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"


export const ProductList = async ({ searchParams }: { searchParams: Promise<ParamsFilter> }) => {
  const params = await searchParams
  const products = await getFilteredProductsAction(params)

  // Caso não encontre produtos com os filtros aplicados
  if (products.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[450px] w-full border border-zinc-800/50 rounded-2xl bg-zinc-900/10 backdrop-blur-sm animate-in fade-in zoom-in duration-500">
            <div className="size-16 bg-zinc-800/30 rounded-full flex items-center justify-center mb-4 ring-1 ring-zinc-700/50">
                <LuSearchX className="text-zinc-500 size-8" />
            </div>
            
            <h3 className="text-zinc-200 font-semibold text-lg">
                Nenhum resultado encontrado
            </h3>
            
            <p className="text-zinc-500 text-sm max-w-[280px] text-center mt-2 leading-relaxed">
                Tente ajustar os filtros ou pesquisar por um termo menos específico.
            </p>

            <Link 
                href="/products" 
                className="mt-6 px-6 py-2 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-300 text-xs font-bold hover:bg-zinc-800 hover:text-white transition-all tracking-tight"
            >
                Limpar todos os filtros
            </Link>
        </div>
    )
}

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-6 gap-y-10">
      {products.map((el) => (
        <ProductCard key={el.id} el={el} />
      ))}
    </div>
  )
}

export const ProductCard = ({ el }: { el: Product }) => {
    return (
        // Faxina: Adicionada a barra "/" para evitar rotas relativas quebradas
        <Link href={`/products/${el.id}`} className="block group">
            <Card className="h-full overflow-hidden border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/60 transition-all duration-300 shadow-xl shadow-black/20">
                <CardContent className="p-0">
                    
                    {/* Área da Imagem - Mantendo aspect-square do real */}
                    <div className="relative aspect-square w-full bg-white overflow-hidden">
                        <Badge 
                            variant="secondary" 
                            className="absolute top-3 left-3 z-10 bg-zinc-950/90 text-yellow-500 border-zinc-700 gap-1.5 py-1"
                        >
                            <FaStar className="text-[10px]" />
                            <span className="text-[11px] font-bold">{el.rating.toFixed(1)}</span>
                        </Badge>

                        <Image  
                            src={el.thumbnail}
                            fill
                            className="object-contain p-6 transition-transform duration-500 group-hover:scale-105" // Reduzi o scale para 105 para ser mais sutil
                            alt={el.title}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                            priority={false} // Imagens da lista não precisam de prioridade total
                        />
                    </div>

                    {/* Conteúdo */}
                    <div className="p-5 flex flex-col gap-3">
                        <span className="text-[10px] text-blue-500 uppercase tracking-widest font-black">
                            {el.category}
                        </span>

                        <h3 className="text-zinc-100 font-semibold text-sm line-clamp-2 h-10 group-hover:text-blue-400 transition-colors leading-snug">
                            {el.title}
                        </h3>

                        <div className="flex items-center gap-2 text-zinc-500">
                            <FaBoxOpen className="text-xs" />
                            <span className="text-[11px]">Disponível: {el.stock} unidades</span>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-4 border-t border-zinc-800/50">
                            <span className="text-zinc-100 text-xl font-black tracking-tight">
                                {el.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>
                            
                            <div className="p-2 bg-zinc-800 rounded-full text-zinc-400 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:translate-x-1">
                                <MdOutlineArrowForwardIos className="text-xs" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
export const ProductListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="flex flex-col overflow-hidden border-zinc-800 bg-zinc-950/50 min-h-[450px]">
          
          {/* CONTAINER DA IMAGEM: Agora sem wrappers que adicionam padding */}
          <div className="w-full aspect-[4/5] relative">
            <Skeleton className="absolute inset-0 h-full w-full rounded-none bg-zinc-900" />
          </div>

          {/* CONTEÚDO ABAIXO DA IMAGEM */}
          <CardFooter className="flex flex-col items-start w-full p-4 gap-3">
            {/* Category */}
            <Skeleton className="h-3 w-20 bg-zinc-900" />
            
            {/* Title */}
            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-full bg-zinc-900" />
              <Skeleton className="h-4 w-[85%] bg-zinc-900" />
            </div>
            
            {/* Price Area */}
            <div className="flex items-center gap-2 mt-2">
              <Skeleton className="h-6 w-16 bg-zinc-800" />
              <Skeleton className="h-4 w-12 bg-zinc-900" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}