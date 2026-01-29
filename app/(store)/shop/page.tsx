import { Separator } from "@/components/ui/separator"
import { ByCategoryProducts, LowStockProductsSection } from './_components/sections'

const Shop = () => {
    return (
        <main className="flex flex-col min-h-screen bg-black pb-20">
            
            {/* Seção: Categoria em Destaque */}
            <section className="py-8">
                <ByCategoryProducts category="electronics"/>
            </section>
            
            {/* Divisor com Separator do Shadcn */}
            <div className="mx-auto w-full max-w-[1400px] px-6">
                <Separator className="bg-zinc-800/50 my-10" />
            </div>

            {/* Seção: Estoque Acabando */}
            <section className="py-8">
                <LowStockProductsSection/>
            </section>
            
        </main>
    )
}

export default Shop