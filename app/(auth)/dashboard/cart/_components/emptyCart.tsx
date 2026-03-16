import Link from "next/link";
import { LuShoppingBag } from "react-icons/lu"; // Usei o Bag para o carrinho
import { Button } from "@/components/ui/button";

export const EmptyCart = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[450px] w-full border-2 border-dashed border-zinc-800/50 rounded-[2rem] bg-zinc-900/5 backdrop-blur-sm px-4 text-center">
            
            {/* ÍCONE COM GLOW DINÂMICO */}
            <div className="relative mb-8">
                {/* O Glow azul combina com o seu tema de 'planos ativos', ou você pode manter o red-500/20 se preferir */}
                <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
                
                <div className="relative bg-zinc-950 border border-zinc-800 p-8 rounded-3xl shadow-2xl overflow-hidden group">
                    {/* Linha de luz interna sutil */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
                    
                    <LuShoppingBag className="size-12 text-zinc-600 group-hover:text-blue-500 transition-colors duration-500" />
                </div>
            </div>

            {/* TEXTOS COM TIPOGRAFIA ESTILIZADA */}
            <div className="space-y-3 max-w-sm">
                <h2 className="text-zinc-100 font-black uppercase italic text-2xl tracking-tighter leading-none">
                    Empty Cart
                </h2>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                    It seems you haven&apos;t chosen your products yet. <br />
                    Explore our store and enjoy your member benefits.
                </p>
            </div>

            {/* BOTÃO DE AÇÃO (CTA) */}
            <Button
                asChild
                variant="outline"
                className="mt-10 border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-100 hover:text-black transition-all duration-300 gap-2 px-10 h-14 rounded-2xl font-bold uppercase text-[11px] tracking-[0.2em]"
            >
                <Link href="/shop">
                    Start Shopping
                </Link>
            </Button>
        </div>
    );
}