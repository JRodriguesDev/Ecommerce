import { Separator } from "@/components/ui/separator"
import { ByCategoryProducts, LowStockProductsSection } from './_components/sections'

const Shop = () => {
    return (
        /* Usei bg-zinc-950 para casar com o Header e Footer, criando um bloco visual único */
        <main className="flex flex-col min-h-screen bg-zinc-950 pb-20">
            
            {/* Seção: Categoria em Destaque */}
            {/* O Suspense aqui permite que uma seção carregue independente da outra */}
            <section className="py-8 md:py-12">
                    <ByCategoryProducts />
            </section>
            {/* Divisor centralizado e sutil */}
            <div className="container mx-auto px-6">
                <Separator className="bg-zinc-800/40 my-8 md:my-12" />
            </div>

            {/* Seção: Estoque Acabando */}
            <section className="py-8 md:py-12">
                    <LowStockProductsSection />
            </section>
            
        </main>
    )
}

export default Shop