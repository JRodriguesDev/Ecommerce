'use server'

import {retrieveSession} from '@/services/stripe/session'
import { getCartProducts } from '@/services/DAL/cart'
import { processOrder } from '@/services/DAL/order'
import {processPlan} from '@/services/DAL/plan'
import {auth} from '@/lib/authjs/auth'
import type {Stripe} from 'stripe'

type typeSession = Stripe.Checkout.Session

export const retrieveCheckoutSessionAction = async (sessionId: string) => {
    return await retrieveSession(sessionId)
}

export const processPurchaseAction = async (stripeSession: typeSession, type: string) => {
    const session = await auth()
    switch (type) {
        case 'cart':
            const cartProducts = await getCartProducts(session!.user!.id!)
            await processOrder(session!.user!.id!, stripeSession, cartProducts)
            break
        case 'subscription':
            await processPlan(session!.user!.id!, stripeSession)
            break
    }
}
