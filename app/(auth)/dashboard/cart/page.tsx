import { LuSearch, LuPlus, LuMinus, LuTrash2, LuShoppingBag, LuArrowRight } from "react-icons/lu"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const Cart = () => {
    return (
        /** * AJUSTES DE LARGURA:
         * pl-72: Recuo para a Sidebar (ajuste se sua sidebar for maior/menor).
         * max-w-5xl: Diminuí a largura total para o layout ficar mais "slim" e elegante.
         */
        <div className="max-w-5xl mx-auto space-y-6 pb-20 px-4 pl-10 lg:pl-72 pt-8">
            
            {/* HEADER DA PÁGINA */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black tracking-tighter text-zinc-100 uppercase italic flex items-center gap-2">
                        Carrinho <LuShoppingBag className="size-5 text-zinc-600" />
                    </h1>
                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">3 itens selecionados</p>
                </div>

                <div className="relative w-full md:w-64">
                    <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-3 text-zinc-600" />
                    <Input 
                        placeholder="Pesquisar..." 
                        className="bg-zinc-900/40 border-zinc-800 pl-9 text-[11px] focus-visible:ring-zinc-700 h-9 rounded-lg"
                    />
                </div>
            </div>

            {/* CONTEÚDO PRINCIPAL EM FLEX-COL (Layout mais estreito) */}
            <div className="flex flex-col xl:flex-row gap-6 items-start">
                
                {/* LISTA DE PRODUTOS */}
                <div className="flex-1 grid grid-cols-1 gap-2 w-full">
                    <CartItemCard 
                        id="PROD-01"
                        title="Teclado Mecânico RGB"
                        price="R$ 549,90"
                        image="https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=150"
                    />

                    <CartItemCard 
                        id="PROD-02"
                        title="Mouse Gamer Ultralight"
                        price="R$ 320,00"
                        image="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=150"
                    />

                    <CartItemCard 
                        id="PROD-03"
                        title="Mousepad Cordura XL"
                        price="R$ 150,00"
                        image="https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=150"
                    />
                </div>

                {/* RESUMO LATERAL - Compacto */}
                <aside className="w-full xl:w-80 shrink-0 sticky top-8">
                    <Card className="bg-zinc-900/10 border-zinc-800/40 backdrop-blur-md overflow-hidden rounded-2xl">
                        <div className="p-5 space-y-5">
                            <h2 className="text-sm font-black uppercase italic text-zinc-400 tracking-tighter">Resumo</h2>
                            
                            <div className="space-y-2.5">
                                <div className="flex justify-between text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                                    <span>Subtotal</span>
                                    <span className="text-zinc-200 text-xs">R$ 1.019,90</span>
                                </div>
                                <div className="flex justify-between text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                                    <span>Envio</span>
                                    <span className="text-green-500 text-xs font-black uppercase">Grátis</span>
                                </div>
                                
                                <div className="h-px bg-zinc-800/50 my-3" />
                                
                                <div className="flex justify-between items-end pt-1">
                                    <span className="text-[10px] font-black uppercase text-zinc-500">Total</span>
                                    <span className="text-xl font-black italic text-white tracking-tighter">R$ 1.019,90</span>
                                </div>
                            </div>

                            <Button className="w-full bg-zinc-100 hover:bg-white text-black font-black py-6 rounded-xl uppercase tracking-widest text-[9px] gap-2 transition-all">
                                Checkout
                                <LuArrowRight className="size-4" />
                            </Button>
                        </div>
                    </Card>
                </aside>
            </div>
        </div>
    )
}

const CartItemCard = ({ id, title, price, image }) => {
    return (
        <Card className="bg-zinc-900/10 border-zinc-800/40 hover:bg-zinc-900/30 hover:border-zinc-700/50 transition-all group overflow-hidden rounded-xl">
            <CardContent className="p-0">
                <div className="flex items-stretch h-24">
                    
                    {/* MINIATURA LATERAL - Reduzida para 24 de altura */}
                    <div className="w-24 shrink-0 overflow-hidden bg-zinc-800 border-r border-zinc-800/30">
                        <img src={image} alt={title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                    </div>

                    {/* CONTEÚDO MAIS COMPACTO */}
                    <div className="flex-1 px-4 py-2 flex items-center justify-between gap-4">
                        
                        <div className="space-y-0.5">
                            <span className="text-[8px] font-black text-zinc-600 tracking-tighter uppercase">{id}</span>
                            <h3 className="text-sm font-bold text-zinc-200 truncate max-w-[180px]">
                                {title}
                            </h3>
                            <p className="text-sm font-black text-zinc-100 italic">{price}</p>
                        </div>

                        {/* AÇÕES COMPACTAS */}
                        <div className="flex items-center gap-3">
                            {/* CONTROLES */}
                            <div className="flex items-center gap-1 bg-black/20 border border-zinc-800/40 rounded-lg p-0.5">
                                <button className="p-1.5 text-zinc-500 hover:text-white transition-colors"><LuMinus className="size-3" /></button>
                                <span className="text-[10px] font-bold text-zinc-200 w-4 text-center">1</span>
                                <button className="p-1.5 text-zinc-500 hover:text-white transition-colors"><LuPlus className="size-3" /></button>
                            </div>

                            <button className="p-2 text-zinc-700 hover:text-red-500 transition-colors">
                                <LuTrash2 className="size-4" />
                            </button>
                        </div>

                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default Cart;