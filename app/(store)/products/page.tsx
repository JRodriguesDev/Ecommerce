import FilterSideBar from "./_components/filterSidebar"
import { Suspense } from "react"
import {ProductListSkeleton, ProductList} from './_components/products'
import {ParamsFilter} from '@/types/params'

const ProductsPage = async ({
    searchParams
}: {
    searchParams : Promise<ParamsFilter>
}) => {
    const params = await searchParams

    return (
        <div className="max-w-[1400px] mx-auto px-6 py-10">
            <div className="flex flex-col md:grid md:grid-cols-4 gap-10">
                {/* 30% - Sidebar (Client Component) */}
                <aside className="md:col-span-1">
                    <FilterSideBar />
                </aside>

                {/* 70% - Products Area */}
                <main className="md:col-span-3">
                    <Suspense key={JSON.stringify(params)} fallback={<ProductListSkeleton/>}>
                        <ProductList params={params}/>
                    </Suspense>
                </main>
            </div>
        </div>
    )
}

export default ProductsPage