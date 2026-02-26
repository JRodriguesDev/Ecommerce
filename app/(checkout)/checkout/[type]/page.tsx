import {cartProductsAction, createCheckoutAction} from './actions'
import { redirect } from 'next/navigation'
import {CartCheckout} from './_components/cartCheckout'

const CheckoutPage = async ({params}: {params: Promise<{type: string}>}) => {
    const {type} = await params

    switch(type) {
        case 'cart':
            const products = await cartProductsAction()
            if (!products || products.length === 0) redirect('/shop')
            const stockIssues = products.filter(p => p.stock! < p.quantity!)
            if (stockIssues.length > 0) redirect('/dashboard/cart');
            const clientSecret = await createCheckoutAction(products, type)
            return <CartCheckout client={clientSecret}/>
    }
}

export default CheckoutPage