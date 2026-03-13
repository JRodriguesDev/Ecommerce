import { FavoriteCardSkeleton } from './_components/favoriteCard'
import { Suspense } from 'react'
import { LuHeart, LuSearch } from "react-icons/lu"
import { Input } from "@/components/ui/input"
import { FavoritesList } from './_components/favoritesList'

const FavoritesPage = () => {

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20 px-4">

            {/* HEADER - Renderiza imediatamente */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-zinc-100 uppercase italic flex items-center gap-3">
                        Favoritos <LuHeart className="fill-red-500 text-red-500 size-6" />
                    </h1>
                    <p className="text-zinc-500 text-sm font-medium">Itens que você salvou para comprar depois.</p>
                </div>

                <div className="relative w-full md:w-72">
                    <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-600" />
                    <Input
                        placeholder="Filtrar favoritos..."
                        className="bg-zinc-900/40 border-zinc-800 pl-10 text-xs h-11 focus-visible:ring-zinc-700 text-zinc-200"
                    />
                </div>
            </div>

            {/* ZONA DE SUSPENSE */}
            {/* O fallback é o Skeleton que fizemos, que aparecerá enquanto o FavoritesList "trabalha" */}
            <Suspense fallback={<FavoriteCardSkeleton />}>
                <FavoritesList />
            </Suspense>
        </div>
    )
}

export default FavoritesPage