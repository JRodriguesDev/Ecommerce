'use client'

import { LuChevronRight, LuCreditCard } from "react-icons/lu"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from 'react'
import { cn } from '@/lib/utils'

export const OrderCard = ({ order }: { order: any }) => {
    const [isHovered, setIsHovered] = useState(false)
    
    // Formatação de Preço
    const formatPrice = (value: number) => {
        return (value / 100).toLocaleString('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
        })
    }

    return (
        <Card 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="bg-zinc-950 border-zinc-800/60 hover:border-zinc-500 transition-all duration-500 group overflow-hidden relative"
        >
            <CardContent className="p-0">
                <div className="flex flex-col">
                    
                    {/* HEADER DO CARD (Sempre visível) */}
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between p-5 gap-6">
                        <div className="flex items-center gap-5">
                            {/* Miniatura Principal (Primeiro item) */}
                            <div className="size-16 shrink-0 overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800">
                                <img 
                                    src={order.products[0].thumbnail} 
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                                />
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-black text-zinc-600 tracking-tighter uppercase">
                                        #{order.id.slice(-8).toUpperCase()}
                                    </span>
                                    <span className="text-[10px] font-bold text-zinc-500">
                                        {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                                    </span>
                                    <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                                        {order.status}
                                    </div>
                                </div>

                                <h3 className="text-sm font-bold text-zinc-200">
                                    Pedido com {order.products.length} {order.products.length === 1 ? 'item' : 'itens'}
                                </h3>

                                <div className="flex items-center gap-4">
                                    <p className="text-sm font-black text-zinc-100">
                                        {formatPrice(order.totalAmount)}
                                    </p>
                                    <div className="flex items-center gap-1.5 text-zinc-500">
                                        <LuCreditCard className="size-3" />
                                        <span className="text-[10px] font-medium uppercase tracking-tight">Stripe Sync</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                             <div className={cn(
                                "flex -space-x-3 transition-all duration-500",
                                isHovered ? "opacity-0 translate-x-4" : "opacity-100"
                             )}>
                                {order.products.slice(0, 3).map((p: any, i: number) => (
                                    <div key={i} className="size-8 rounded-full border-2 border-zinc-950 overflow-hidden bg-zinc-800">
                                        <img src={p.thumbnail} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                                {order.products.length > 3 && (
                                    <div className="size-8 rounded-full border-2 border-zinc-950 bg-zinc-900 flex items-center justify-center text-[10px] text-zinc-400 font-bold">
                                        +{order.products.length - 3}
                                    </div>
                                )}
                             </div>
                             
                             <button className="flex items-center gap-2 px-5 py-3 bg-zinc-100 hover:bg-white text-black rounded-xl text-[10px] font-black transition-all">
                                DETALHES
                                <LuChevronRight className={cn("size-4 transition-transform", isHovered && "rotate-90")} />
                            </button>
                        </div>
                    </div>

                    {/* LISTA EXPANSÍVEL (Aparece no hover) */}
                    <div className={cn(
                        "grid transition-all duration-500 ease-in-out border-t border-zinc-900 bg-zinc-900/20",
                        isHovered ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}>
                        <div className="overflow-hidden">
                            <div className="p-5 space-y-4">
                                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Itens do Pedido</p>
                                {order.products.map((item: any, idx: number) => (
                                    <div key={idx} className="flex items-center justify-between group/item">
                                        <div className="flex items-center gap-4">
                                            <div className="size-10 rounded-lg overflow-hidden border border-zinc-800">
                                                <img src={item.thumbnail} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-zinc-300 group-hover/item:text-white transition-colors">{item.title}</p>
                                                <p className="text-[10px] text-zinc-500">Qtd: {item.quantity} × {formatPrice(item.price)}</p>
                                            </div>
                                        </div>
                                        <p className="text-xs font-mono font-bold text-zinc-400">
                                            {formatPrice(item.price * item.quantity)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}