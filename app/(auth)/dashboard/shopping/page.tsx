import { LuSearch, LuChevronRight, LuDownload, LuExternalLink, LuReceipt } from "react-icons/lu"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

const Shopping = () => {
    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-20 px-4">
            
            {/* HEADER DA PÁGINA */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-zinc-100 uppercase italic">Meus Pedidos</h1>
                    <p className="text-zinc-500 text-sm font-medium">Histórico de compras e acessos.</p>
                </div>

                <div className="relative w-full md:w-80">
                    <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-600" />
                    <Input 
                        placeholder="Pesquisar por nome ou código..." 
                        className="bg-zinc-900/40 border-zinc-800 pl-10 text-xs focus-visible:ring-zinc-700 h-11"
                    />
                </div>
            </div>

            {/* LISTA DE PEDIDOS */}
            <div className="grid grid-cols-1 gap-3">
                
                <OrderCard 
                    id="ORD-2026-X992"
                    date="02 de Fev, 2026"
                    title="Curso Master de Next.js & Tailwind CSS"
                    price="R$ 197,90"
                    method="Cartão de Crédito"
                    image="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop"
                />

                <OrderCard 
                    id="ORD-2026-K110"
                    date="28 de Jan, 2026"
                    title="Pacote de Assets UI/UX Premium"
                    price="R$ 45,00"
                    method="PIX"
                    image="https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?w=100&h=100&fit=crop"
                />

                <OrderCard 
                    id="ORD-2026-B882"
                    date="15 de Jan, 2026"
                    title="Licença Anual Software de Edição"
                    price="R$ 890,00"
                    method="Boleto"
                    image="https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?w=100&h=100&fit=crop"
                />

            </div>
        </div>
    )
}

// CARD SIMPLIFICADO: FOCO EM PRODUTO E PAGAMENTO
const OrderCard = ({ id, date, title, price, method, image }) => {
    return (
        <Card className="bg-zinc-900/20 border-zinc-800/60 hover:bg-zinc-900/40 hover:border-zinc-700 transition-all group overflow-hidden">
            <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-stretch">
                    
                    {/* MINIATURA LATERAL */}
                    <div className="w-full md:w-32 h-32 md:h-auto shrink-0 overflow-hidden bg-zinc-800">
                        <img src={image} alt={title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                    </div>

                    {/* CONTEÚDO */}
                    <div className="flex-1 p-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black text-zinc-600 tracking-tighter uppercase">{id}</span>
                                <span className="text-zinc-800 text-[10px]">•</span>
                                <span className="text-[10px] font-bold text-zinc-500 uppercase">{date}</span>
                            </div>
                            
                            <h3 className="text-base font-bold text-zinc-200 group-hover:text-white transition-colors">
                                {title}
                            </h3>
                            
                            <div className="flex items-center gap-4">
                                <p className="text-sm font-black text-zinc-100">{price}</p>
                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-zinc-800/50 border border-zinc-700/50">
                                    <LuReceipt className="size-3 text-zinc-500" />
                                    <span className="text-[10px] text-zinc-400 font-medium">{method}</span>
                                </div>
                            </div>
                        </div>

                        {/* AÇÕES DISCRETAS */}
                        <div className="flex items-center gap-2 border-t border-zinc-800 pt-4 md:border-none md:pt-0">
                            <button title="Download / Acessar" className="p-3 bg-zinc-800/50 hover:bg-blue-600 rounded-xl text-zinc-400 hover:text-white transition-all">
                                <LuExternalLink className="size-4" />
                            </button>
                            <button className="flex items-center gap-2 px-4 py-3 bg-zinc-100 hover:bg-white text-black rounded-xl text-xs font-black transition-all">
                                DETALHES
                                <LuChevronRight className="size-4" />
                            </button>
                        </div>

                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default Shopping