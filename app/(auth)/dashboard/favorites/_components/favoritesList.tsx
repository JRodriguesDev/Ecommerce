import { auth } from '@/lib/authjs/auth'
import { getFavoritesProductsAction } from '../actions'
import { FavoriteCard } from './favoriteCard'
import { LuHeart } from "react-icons/lu"
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// 2. COMPONENTE DE DADOS (O que realmente busca no banco)
export const FavoritesList= async () => {
    const session = await auth()
    const userId = session?.user?.id
    if (!userId) return <p className="text-zinc-500">Faça login para ver seus favoritos.</p>

    // O "await" acontece aqui, dentro do Suspense!
    const products = await getFavoritesProductsAction(userId)


    if (products.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[450px] w-full border-2 border-dashed border-zinc-800/50 rounded-[2rem] bg-zinc-900/10 backdrop-blur-sm px-4 text-center">
            {/* ÍCONE COM GLOW */}
            <div className="relative mb-6">
                <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />
                <div className="relative bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-2xl">
                    <LuHeart className="size-10 text-zinc-700" />
                </div>
            </div>

            {/* TEXTOS */}
            <div className="space-y-2 max-w-xs">
                <h2 className="text-zinc-100 font-black uppercase italic text-xl tracking-tighter">
                    Nada por aqui ainda
                </h2>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                    Sua lista de desejos está pedindo por novos itens. Que tal explorar nossas ofertas?
                </p>
            </div>

            {/* BOTÃO DE AÇÃO (CTA) */}
            <Button 
                asChild
                variant="outline"
                className="mt-10 border-zinc-700 hover:bg-white hover:text-black transition-all gap-2 px-8 h-12 rounded-xl font-bold uppercase text-[10px] tracking-widest"
            >
                <Link href="/shop">
                    Ir para a Loja
                </Link>
            </Button>
        </div>
    )
}

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
                <FavoriteCard 
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    thumbnail={product.thumbnail}
                    rating={product.rating}
                    slug={product.slug}
                    stock={product.stock}
                />
            ))}
        </div>
    )
}