import FilterSideBar from "./_components/filterSidebar"
import { Suspense } from "react"
import {ProductListSkeleton, ProductList} from './_components/products'

const ProductsPage = async ({
    searchParams
}: {
    searchParams : Promise<{[key: string]: string | string[] | undefined}>
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
                    <Suspense fallback={<ProductListSkeleton/>}>
                        <ProductListSkeleton/>
                    </Suspense>
                </main>
            </div>
        </div>
    )
}

export default ProductsPage