import {Carousel} from "@/components/carousel"
import {productsLowStock, productsByCategory} from '../actions'

export const LowStockProductsSection = async () => {
    const products = await productsLowStock()

    return (
        <>
            <Carousel products={products}/>
        </>
    )
}

export const ByCategoryProducts = async ({category}: {category: string}) => {
    const products = await productsByCategory(category)

    return (
        <>
            <Carousel products={products}/>
        </>
    )
}

