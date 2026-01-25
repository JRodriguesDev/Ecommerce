import {allCategories} from '../actions'
import { Suspense } from "react";
import Link from 'next/link';


export const DropCategories = () => {

    return (
        <div className="absolute min-w-5/12 p-3 min-h-30 top-10 -left-35 z-10 rounded-md">
            <Suspense fallback={<CategoriesSkeleton/>}>
                <Categories/>
            </Suspense>
        </div>
    )
} 

export const CategoriesSkeleton = () => {

    return (
        <div className="w-full min-h-30 bg-black p-3 flex flex-col flex-wrap gap-2 content-center rounded-md">
            {[...Array(20)].map((_, i) => (
                <div key={i} className="w-9/12 h-5 bg-gray-300 rounded animate-pulse cursor-pointer"></div>
            ))}
        </div>
    )
}

export const Categories = async () => {
    const categories = await allCategories()

    return (
        <div className="w-full min-h-30 bg-white flex flex-col content-center flex-wrap rounded-md">
            {categories.map((el) => (
                <Link href={`/product?cat=${el.name}`} key={el.id} className="text-blue-800 cursor-pointer">{el.name.replace('-', ' ')}</Link>
            ))}
        </div>
    )
}