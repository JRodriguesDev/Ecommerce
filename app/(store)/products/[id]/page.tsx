import {ProductDetails, ProductSkeleton} from './_components/productDetails'
import { Suspense } from 'react'

const Product = async ({params}: {params: Promise<{id: string}>}) => {

    return  (
        <div>
            <Suspense fallback={<ProductSkeleton/>}>
                <ProductDetails params={params}/>
            </Suspense>
        </div>
    )
}

export default Product