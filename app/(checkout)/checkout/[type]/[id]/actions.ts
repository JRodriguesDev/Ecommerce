'use server'

import {retrieveSession, retrieveSubscriptionSession} from '@/services/stripe/session'
import { getCartProducts } from '@/services/DAL/cart'
import { processOrder } from '@/services/DAL/order'
import {processPlan} from '@/services/DAL/plan'
import {auth} from '@/lib/authjs/auth'

export const retrieveCheckoutSessionAction = async (sessionId: string) => {
    return await retrieveSession(sessionId)
}

export const processPurchaseAction = async (sessionId: string, type: string) => {
    const session = await auth()
    let stripeSession
    switch (type) {
        case 'cart':
            const cartProducts = await getCartProducts(session!.user!.id!)
            stripeSession = await retrieveSession(sessionId)
            await processOrder(session!.user!.id!, stripeSession, cartProducts)
            break
        case 'subscription':
            stripeSession = await retrieveSubscriptionSession(sessionId)
            await processPlan(session!.user!.id!, stripeSession)
            break
    }
}
