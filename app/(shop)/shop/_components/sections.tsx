import {CarouselSection} from "./carousel"
import {productsLowStock, productsByCategory} from '../actions'
import { Suspense } from "react"
import { CarrouselSkeleton } from "../_components/carousel"

export const ByCategoryProducts = async ({category}: {category: string}) => {
    const products = await productsByCategory(category)

    return (
            <section className="mx-auto w-full max-w-[1400px] mt-16 px-6">
                <div className="flex flex-col mb-8">
                    <h2 className="text-zinc-100 text-2xl font-bold tracking-tight">
                        Featured Category
                    </h2>
                    <p className="text-zinc-500 text-sm">Explorar os melhores eletrônicos do mercado.</p>
                </div>
                
                <Suspense fallback={<CarrouselSkeleton />}>
                    <CarouselSection products={products} />
                </Suspense>
            </section>
    )
}

export const LowStockProductsSection = async () => {
    const products = await productsLowStock()

    return (
            <section className="mx-auto w-full max-w-[1400px] px-6">
                <div className="flex flex-col mb-8">
                    <h2 className="text-zinc-100 text-2xl font-bold tracking-tight flex items-center gap-2">
                        Last Units
                        <span className="bg-red-500/10 text-red-500 text-[12px] px-2 py-0.5 rounded-full uppercase">
                            Low Stock
                        </span>
                    </h2>
                    <p className="text-zinc-500 text-sm">Garanta o seu antes que acabe.</p>
                </div>

                <Suspense fallback={<CarrouselSkeleton />}>
                    <CarouselSection products={products}/>
                </Suspense>
            </section>  
    )
}




