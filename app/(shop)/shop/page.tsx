import { Suspense } from "react"
import { CarrouselSkeleton } from "@/components/carousel"
import {ByCategoryProducts, LowStockProductsSection} from './_components/carrousels'

const Shop = () => {

    return (
        <main className="flex flex-col">
            <section className="bg-white mx-15 mt-15 flex flex-col">
                <span className="text-center mb-3.5 text-xl font-semibold">Categoria Em Destaque</span>
                <Suspense fallback={<CarrouselSkeleton/>}>
                    <ByCategoryProducts category="electronics"/>
                </Suspense>
            </section>
            
            <section className="bg-white mx-15 mt-15 flex flex-col">
                <span className="text-center mb-3.5 text-xl font-semibold">Estoque Acabando</span>
                <Suspense fallback={<CarrouselSkeleton/>}>
                    <LowStockProductsSection/>
                </Suspense>
            </section>  
        </main>
    )
}

export default Shop