import FilterSideBar from "./_components/filterSidebar"
import { Suspense } from "react"
import {ProductListSkeleton, ProductList} from './_components/products'
import {ParamsFilter} from '@/types/params'

const ProductsPage = ({
    searchParams
}: {
    searchParams : Promise<ParamsFilter>
}) => {

    return (
        <div className="max-w-[1400px] mx-auto px-6 py-10">
            <div className="flex flex-col md:grid md:grid-cols-4 gap-10">
                {/* 30% - Sidebar (Client Component) */}
                <aside className="md:col-span-1">
                    <Suspense fallback={<div className="w-full h-80 bg-zinc-900/50 animate-pulse rounded-xl" />}>
                        <FilterSideBar />
                    </Suspense>
                </aside>

                {/* 70% - Products Area */}
                <main className="md:col-span-3">
                    <Suspense fallback={<ProductListSkeleton/>}>
                        <ProductList searchParams={searchParams}/>
                    </Suspense>
                </main>
            </div>
        </div>
    )
}

export default ProductsPage