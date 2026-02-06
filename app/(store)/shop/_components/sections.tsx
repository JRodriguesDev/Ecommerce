import { CarouselSection, CarrouselSkeleton } from "./carousel"
import { productsLowStock, productsByCategory } from '../actions'
import { Suspense } from "react"

// Componente auxiliar para fazer o fetch e permitir o Suspense no pai
const ByCategoryList = async ({ category }: { category: string }) => {
    const products = await productsByCategory(category)
    return <CarouselSection products={products} />
}

export const ByCategoryProducts = ({ category }: { category: string }) => {
    return (
        <section className="mx-auto w-full max-w-[1400px] mt-16 px-6">
            <div className="flex flex-col mb-8">
                <h2 className="text-zinc-100 text-2xl font-bold tracking-tight">
                    Featured Category
                </h2>
                <p className="text-zinc-500 text-sm">Explorar os melhores eletrônicos do mercado.</p>
            </div>
            
            {/* Agora o Suspense funciona! Ele mostra o Skeleton enquanto ByCategoryList faz o await */}
            <Suspense fallback={<CarrouselSkeleton />}>
                <ByCategoryList category={category} />
            </Suspense>
        </section>
    )
}

// Mesma lógica para o Low Stock
const LowStockList = async () => {
    const products = await productsLowStock()
    return <CarouselSection products={products} />
}

export const LowStockProductsSection = () => {
    return (
        <section className="mx-auto w-full max-w-[1400px] px-6">
            <div className="flex flex-col mb-8">
                <h2 className="text-zinc-100 text-2xl font-bold tracking-tight flex items-center gap-2">
                    Last Units
                    <span className="bg-red-500/10 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">
                        Low Stock
                    </span>
                </h2>
                <p className="text-zinc-500 text-sm">Garanta o seu antes que acabe.</p>
            </div>

            <Suspense fallback={<CarrouselSkeleton />}>
                <LowStockList />
            </Suspense>
        </section>  
    )
}