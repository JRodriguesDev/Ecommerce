import { LuArrowRight } from "react-icons/lu"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SummaryProps {
    items: {
        title: string;
        price: number;
        quantity: number;
    }[]
}

export const Summary = ({ items }: SummaryProps) => {
    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0)

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value)
    }

    return (
        <aside className="w-full xl:w-80 shrink-0 sticky top-8">
            <Card className="bg-zinc-900/10 border-zinc-800/40 backdrop-blur-md overflow-hidden rounded-2xl">
                <div className="p-5 space-y-6">
                    <h2 className="text-sm font-black uppercase italic text-zinc-400 tracking-tighter">Resumo do Pedido</h2>
                    
                    {/* LISTA DE ITENS COMPACTA */}
                    <div className="space-y-3 max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-800">
                        {items.map((item, index) => (
                            <div key={index} className="flex justify-between items-start gap-4">
                                <div className="flex-1">
                                    <p className="text-[10px] font-bold text-zinc-300 line-clamp-1 leading-none uppercase">
                                        {item.title}
                                    </p>
                                    <span className="text-[9px] text-zinc-500 font-black italic">
                                        {item.quantity}x {formatCurrency(item.price)}
                                    </span>
                                </div>
                                <span className="text-[10px] font-bold text-zinc-400 whitespace-nowrap">
                                    {formatCurrency(item.price * item.quantity)}
                                </span>
                            </div>
                        ))}
                        {items.length === 0 && (
                            <p className="text-[10px] text-zinc-600 italic">Seu carrinho está vazio.</p>
                        )}
                    </div>

                    <div className="h-px bg-zinc-800/50" />

                    {/* TOTAIS */}
                    <div className="space-y-2.5">
                        <div className="flex justify-between text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-3">
                            <span>Subtotal</span>
                            <span className="text-zinc-200 text-xs">{formatCurrency(subtotal)}</span>
                        </div>
                        
                        <div className="h-px bg-zinc-800/50 my-3" />
                        
                        <div className="flex justify-between items-end pt-1">
                            <span className="text-[10px] font-black uppercase text-zinc-500">Total Final</span>
                            <span className="text-xl font-black italic text-white tracking-tighter">
                                {formatCurrency(subtotal)}
                            </span>
                        </div>
                    </div>

                    <Button 
                        disabled={items.length === 0}
                        className="w-full bg-zinc-100 hover:bg-white text-black font-black py-6 rounded-xl uppercase tracking-widest text-[9px] gap-2 transition-all disabled:opacity-50 active:scale-[0.98]"
                    >
                        Finalizar Compra
                        <LuArrowRight className="size-4" />
                    </Button>
                </div>
            </Card>
        </aside>
    )
}

export const SummarySkeleton = () => {
    return (
        <aside className="w-full xl:w-80 shrink-0 sticky top-8">
            <Card className="bg-zinc-900/10 border-zinc-800/40 backdrop-blur-md overflow-hidden rounded-2xl">
                <div className="p-5 space-y-6 animate-pulse">
                    {/* Título: Resumo do Pedido */}
                    <div className="h-3 w-28 bg-zinc-800 rounded" />
                    
                    {/* LISTA DE ITENS SKELETON */}
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex justify-between items-start gap-4">
                                <div className="flex-1 space-y-2">
                                    {/* Nome do produto */}
                                    <div className="h-2 w-full bg-zinc-800/60 rounded" />
                                    {/* Qtd x Preço */}
                                    <div className="h-2 w-16 bg-zinc-800/30 rounded" />
                                </div>
                                {/* Subtotal da linha */}
                                <div className="h-3 w-14 bg-zinc-800/40 rounded mt-1" />
                            </div>
                        ))}
                    </div>

                    <div className="h-px bg-zinc-800/50" />

                    {/* TOTAIS SKELETON */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <div className="h-2 w-12 bg-zinc-800/50 rounded" />
                            <div className="h-3 w-20 bg-zinc-800 rounded" />
                        </div>
                        
                        <div className="flex justify-between items-center">
                            <div className="h-2 w-10 bg-zinc-800/50 rounded" />
                            <div className="h-3 w-14 bg-zinc-800/30 rounded" />
                        </div>
                        
                        <div className="h-px bg-zinc-800/50 my-2" />
                        
                        <div className="flex justify-between items-end pt-1">
                            <div className="h-3 w-10 bg-zinc-800/50 rounded" />
                            <div className="h-7 w-32 bg-zinc-800 rounded" />
                        </div>
                    </div>

                    {/* Botão de Checkout Skeleton */}
                    <div className="w-full h-[52px] bg-zinc-800/50 rounded-xl" />
                </div>
            </Card>
        </aside>
    )
}