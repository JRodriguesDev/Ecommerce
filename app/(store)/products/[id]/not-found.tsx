import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LuSearchX, LuArrowLeft, LuLayoutGrid } from "react-icons/lu"

export default function NotFound() {
    return (
        <div className="min-h-[85vh] flex flex-col items-center justify-center px-6 bg-zinc-950">
            <div className="relative w-full max-w-lg">
                {/* Efeito de iluminação azul suave */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-64 bg-blue-600/10 blur-[120px] rounded-full -z-10" />
                
                <div className="relative flex flex-col items-center text-center">
                    {/* Ícone Indicativo */}
                    <div className="size-20 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mb-8 shadow-inner ring-1 ring-white/5">
                        <LuSearchX className="size-10 text-zinc-500" />
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-4xl font-black text-zinc-100 tracking-tight italic">
                            PRODUTO NÃO ENCONTRADO
                        </h1>
                        <p className="text-zinc-400 max-w-[400px] text-sm leading-relaxed mx-auto">
                            Parece que este produto não existe ou o link foi alterado. 
                            Não se preocupe, você pode encontrar outros itens incríveis na nossa loja.
                        </p>
                    </div>

                    {/* Ações Direcionadas */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 w-full max-w-md">
                        <Button 
                            asChild 
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 h-12 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-900/20"
                        >
                            <Link href="/products" className="flex items-center gap-2">
                                <LuLayoutGrid className="size-4" /> Voltar para a Loja
                            </Link>
                        </Button>
                        
                        <Button 
                            asChild 
                            variant="ghost" 
                            className="w-full sm:w-auto text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 h-12 px-8 rounded-xl transition-all"
                        >
                            <Link href="/shop" className="flex items-center gap-2">
                                <LuArrowLeft className="size-4" /> Página Inicial
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Linha Decorativa Minimalista */}
                <div className="mt-16 flex items-center justify-center gap-4 opacity-20">
                    <div className="h-px w-12 bg-zinc-700" />
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">
                        Ecommerce
                    </span>
                    <div className="h-px w-12 bg-zinc-700" />
                </div>
            </div>  
        </div>
    )
}