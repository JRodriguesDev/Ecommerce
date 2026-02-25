import 'server-only'

import stripe from '@/lib/stripe/index'
import type {Stripe} from 'stripe'

type stripeLineItems = Stripe.Checkout.SessionCreateParams.LineItem 

export const createSession = async (data: stripeLineItems[]) => {
    const session = await stripe.checkout.sessions.create({
        ui_mode: 'custom',
        mode: 'payment',
        line_items: data,
        return_url: 'http://localhost:3000/checkout/cart/{CHECKOUT_SESSION_ID}'
    })
    return {clientSecret: session.client_secret}
}