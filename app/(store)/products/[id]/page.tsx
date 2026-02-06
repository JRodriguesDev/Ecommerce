import { ProductDetails, ProductSkeleton } from './_components/productDetails'
import { Suspense } from 'react'

interface PageProps {
  params: Promise<{ id: string }>
}

const ProductPage = async ({ params }: PageProps) => {
    
    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100">
            {/* O Suspense isola o fetch do produto. 
                O restante do layout (Header/Footer) já estará visível para o usuário. 
            */}
            <Suspense fallback={<ProductSkeleton />}>
                <ProductDetails params={params} />
            </Suspense>
        </main>
    )
}

export default ProductPage