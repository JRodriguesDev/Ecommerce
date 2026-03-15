import { LuStar } from "react-icons/lu"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { QuantityControls, TrashButton } from './cardInteratives'
import { itemCard } from '../props/itemCard'

export const CartItemCard = ({
    id,
    title,
    price,
    thumbnail,
    slug,
    rating,
    stock,
    quantity
}: itemCard) => {
    return (
        <Card className="bg-zinc-900/10 border-zinc-800/40 hover:bg-zinc-900/30 hover:border-zinc-700/50 transition-all group overflow-hidden rounded-xl">
            <CardContent className="p-0">
                <div className="flex items-stretch h-28"> {/* Aumentei levemente para acomodar o rating */}

                    {/* MINIATURA LATERAL */}
                    <Link href={`/products/${slug}`} className="w-28 shrink-0 overflow-hidden bg-zinc-800 border-r border-zinc-800/30 relative">
                        <img
                            src={thumbnail}
                            alt={title}
                            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                    </Link>

                    {/* CONTEÚDO */}
                    <div className="flex-1 px-4 py-3 flex items-center justify-between gap-4">

                        <div className="space-y-1">
                            {/* ID e Rating */}
                            <div className="flex items-center gap-2">
                                <span className="text-[8px] font-black text-zinc-600 tracking-tighter uppercase">{id}</span>
                                <div className="flex items-center gap-0.5 text-amber-500/80">
                                    <LuStar className="size-2 fill-current" />
                                    <span className="text-[10px] font-bold">{rating}</span>
                                </div>
                            </div>

                            <Link href={`/products/${slug}`}>
                                <h3 className="text-sm font-bold text-zinc-200 truncate max-w-[180px] hover:text-blue-400 transition-colors">
                                    {title}
                                </h3>
                            </Link>

                            <div className="flex items-center gap-2">
                                <p className="text-sm font-black text-zinc-100 italic">
                                    {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(price / 100)}
                                </p>
                                <span className="text-[10px] text-zinc-500 font-medium">
                                    Estoque: {stock}
                                </span>
                            </div>
                        </div>

                        {/* AÇÕES */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 bg-black/20 border border-zinc-800/40 rounded-lg p-0.5">
                                <QuantityControls productId={id} initialQuantity={quantity} stock={stock} />
                            </div>
                            <TrashButton productId={id} />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}