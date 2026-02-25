import {Product} from '@/types/product'
import {loadStripe} from '@stripe/stripe-js'
import {createCheckoutIntentProductAction} from '../actions'

const stipePromise = loadStripe(process.env.STRIPE_PUBLIC!)

export const CartCheckout = async ({data}: {data: Product[]}) => {
    const seesion = await createCheckoutIntentProductAction(data)

    return (
        <p>/session</p>
    )
}