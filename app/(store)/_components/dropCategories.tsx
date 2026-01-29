import { allCategories } from '../actions'
import { Suspense } from "react";
import Link from 'next/link';
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area"; // Opcional: para categorias longas

export const DropCategories = () => {
    return (
        /* Container com Glassmorphism e Sombra pesada */
        <div className="absolute top-full mt-2 w-72 bg-zinc-950/95 backdrop-blur-md border border-zinc-800 p-2 rounded-xl shadow-2xl z-50">
            <Suspense fallback={<CategoriesSkeleton />}>
                <Categories />
            </Suspense>
        </div>
    )
} 

export const CategoriesSkeleton = () => {
    return (
        <div className="space-y-2 p-2">
            <div className="text-xs font-semibold text-zinc-500 mb-3 px-2 uppercase tracking-widest">Loading categories...</div>
            {[...Array(8)].map((_, i) => (
                <div key={i} className="flex items-center w-full px-2 py-1">
                    <Skeleton className="h-4 w-full bg-zinc-800 rounded-md" />
                </div>
            ))}
        </div>
    )
}

export const Categories = async () => {
    const categories = await allCategories()

    return (
        <div className="flex flex-col p-1">
            <div className="text-xs font-semibold text-zinc-500 mb-3 px-2 py-1 uppercase tracking-widest border-b border-zinc-900 pb-2">
                Categories
            </div>
            
            {/* Se houver muitas categorias, o ScrollArea do Shadcn é uma boa aqui */}
            <div className="grid grid-cols-1 gap-1 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                {categories.map((el) => (
                    <Link 
                        href={`/products?cat=${el.name}`} 
                        key={el.id} 
                        className="px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-all capitalize"
                    >
                        {el.name.replace(/-/g, ' ')}
                    </Link>
                ))}
            </div>
        </div>
    )
}