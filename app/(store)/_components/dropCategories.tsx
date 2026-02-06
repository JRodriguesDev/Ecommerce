import { allCategories } from '../actions'
import Link from 'next/link';
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const DropCategories = () => {
    return (
        <Suspense fallback={<CategoriesSkeleton />}>
            <Categories />
        </Suspense>
    )
} 

export const CategoriesSkeleton = () => {
    return (
        <div className="space-y-2 p-2 w-64">
            <div className="text-[10px] font-bold text-zinc-600 mb-3 px-2 uppercase tracking-[0.2em]">
                Loading...
            </div>
            {[...Array(6)].map((_, i) => (
                <div key={i} className="px-2 py-1">
                    <Skeleton className="h-4 w-3/4 bg-zinc-800/50 rounded" />
                </div>
            ))}
        </div>
    )
}

export const Categories = async () => {
    const categories = await allCategories()

    return (
        <div className="flex flex-col min-w-[240px]">
            <div className="text-[10px] font-bold text-zinc-500 mb-2 px-3 py-1 uppercase tracking-[0.2em] border-b border-zinc-800/50 pb-2">
                All Categories
            </div>
            
            <div className="grid grid-cols-1 gap-0.5 max-h-[350px] overflow-y-auto custom-scrollbar pr-1">
                {categories.map((el) => (
                    <Link 
                        href={`/products?cat=${el.name}`} 
                        key={el.id} 
                        className="px-3 py-2 text-sm text-zinc-400 hover:text-blue-400 hover:bg-blue-500/5 rounded-md transition-all capitalize whitespace-nowrap"
                    >
                        {el.name.replace(/-/g, ' ')}
                    </Link>
                ))}
            </div>
        </div>
    )
}