import {CartItemCard} from './itemCard'
import {Summary} from './summary'
import {getProductsAction} from '../actions'
import {auth} from '@/lib/authjs/auth'
import {EmptyCart} from './emptyCart'

export const Cards = async () => {
    const session = await auth()
    const products = await getProductsAction()
    console.log(products)

    if (products.length == 0) return <EmptyCart/>

    return (
        <>
            {products.map((el) => (
                <CartItemCard 
                    key={el.id}
                    id={el.id!} 
                    price={el.price!} 
                    quantity={el.quantity!} 
                    rating={el.rating!}
                    slug={el.slug!}
                    stock={el.stock!}
                    thumbnail={el.thumbnail!}
                    title={el.title!}
                />
            ))}
        </>
    )
}

export const SummaryPrices = async () => {
    const session = await auth()
    const products = await getProductsAction()
    const items = products.map((el) => ({title: el.title!, price: el.price!, quantity: el.quantity}))

    return (
        <>
            <Summary items={items}/>
        </>
    )
}