import {cartProductsAction, createCheckoutAction, planCheckAction, createCheckoutSubscriptionAction} from './actions'
import { redirect } from 'next/navigation'
import {CartCheckout} from './_components/cartCheckout'

const CheckoutPage = async ({params, searchParams}: {params: Promise<{type: string}>, searchParams: Promise<{plan?: string, invoice?: string}>}) => {
    const {type} = await params
    let clientSecret = ''

    switch(type) {
        case 'cart':
            const products = await cartProductsAction()
            if (!products || products.length === 0) redirect('/shop')
            const stockIssues = products.filter(p => p.stock! < p.quantity!)
            if (stockIssues.length > 0) redirect('/dashboard/cart');
            clientSecret = await createCheckoutAction(products, type)
            return <CartCheckout client={clientSecret}/>
        case 'subscription':
            const {plan: planId} = await searchParams
            await planCheckAction(planId)
            clientSecret = await createCheckoutSubscriptionAction(planId, type)
            return <CartCheckout client={clientSecret}/>
    }       
}

export default CheckoutPage