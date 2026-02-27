'use server'

import {retrieveSession} from '@/services/stripe/session'
import { getCartProducts } from '@/services/DAL/cart'
import { processOrder } from '@/services/DAL/order'
import {auth} from '@/lib/authjs/auth'
import type {Stripe} from 'stripe'

type typeSession = Stripe.Checkout.Session

export const retrieveCheckoutSessionAction = async (sessionId: string) => {
    return await retrieveSession(sessionId)
}

export const processPurchaseAction = async (stripeSession: typeSession) => {
    const session = await auth()
    const cartProducts = await getCartProducts(session!.user!.id!)
    await processOrder(session!.user!.id!, stripeSession, cartProducts)
}
