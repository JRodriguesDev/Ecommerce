import FilterSideBar from "./_components/filterSidebar"
import { Suspense } from "react"
import { ProductListSkeleton, ProductList } from './_components/products'

const ProductsPage = async ({ searchParams }: PageProps) => {
    // Aguardamos os params para garantir que a key do Suspense seja reativa
    const params = await searchParams
    
    // Faxina: Criamos uma chave única baseada nos filtros atuais.
    // Isso "reseta" o Suspense e mostra o skeleton toda vez que o filtro muda.
    const searchKey = JSON.stringify(params)

    return (
        <div className="max-w-[1400px] mx-auto px-6 py-10 min-h-screen bg-zinc-950 selection:bg-blue-500/30">
            {/* SEO: Título invisível para acessibilidade e buscadores */}
            <h1 className="sr-only">Nossa Lista de Produtos</h1>

            <div className="flex flex-col md:grid md:grid-cols-4 gap-10">
                
                {/* Sidebar - Sticky: Fica fixa enquanto o usuário rola a lista longa */}
                <aside className="md:col-span-1">
                    <div className="sticky top-28 transition-all duration-300"> 
                        <Suspense fallback={
                            <div className="w-full h-[600px] bg-zinc-900/30 animate-pulse rounded-2xl border border-zinc-800/50" />
                        }>
                            <FilterSideBar />
                        </Suspense>
                    </div>
                </aside>

                {/* Área de Conteúdo Principal */}
                <main className="md:col-span-3">
                    {/* Faxina: O Suspense com key é o segredo da fluidez no Next 15 */}
                    <Suspense key={searchKey} fallback={<ProductListSkeleton />}>
                        <ProductList searchParams={searchParams} />
                    </Suspense>
                </main>
            </div>
        </div>
    )
}

export default ProductsPage