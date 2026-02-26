'use client'

import {loadStripe} from '@stripe/stripe-js'
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC!)

export const CartCheckout = ({client}: {client: string}) => {

    return (
        <div id='checkout'>
            <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{clientSecret: client}}
            >
                <EmbeddedCheckout/>
            </EmbeddedCheckoutProvider>
        </div>
    )
}