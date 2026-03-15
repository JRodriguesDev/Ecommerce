import 'server-only'

import stripe from '@/lib/stripe/index'
import type {Stripe} from 'stripe'

type stripeLineItems = Stripe.Checkout.SessionCreateParams.LineItem 

export const createSession = async (data: stripeLineItems[], customerId: string, type: string) => {
    const session = await stripe.checkout.sessions.create({
        customer: customerId,
        ui_mode: 'embedded',
        mode: 'payment',
        line_items: data,
        saved_payment_method_options: {payment_method_save: 'enabled'},
        return_url: `http://localhost:3000/checkout/${type}/{CHECKOUT_SESSION_ID}`
    })
    return session.client_secret!
}

export const retrieveSession = async (sessionId: string) => {
    const session = await stripe.checkout.sessions.retrieve(
        sessionId,
        {
            expand: ['line_items', 'payment_intent']
        }
    )
    return session
}

export const createSubscriptionSession = async (data: stripeLineItems[], customerId: string, type: string, hasPlan: string) => {
    const oldPlan = hasPlan ? `?oldPlan=${hasPlan}` : ''
    const session = await stripe.checkout.sessions.create({
        customer: customerId,
        ui_mode: 'embedded',
        mode: 'subscription',
        line_items: data,
        saved_payment_method_options: {payment_method_save: 'enabled'},
        return_url: `http://localhost:3000/checkout/${type}/{CHECKOUT_SESSION_ID}${oldPlan}`
    })
    return session.client_secret!
}

export const retrieveSubscriptionSession = async (sessionId: string) => {
    const session = await stripe.checkout.sessions.retrieve(
        sessionId,
        {expand: ['subscription', 'line_items']}
    )
    return session
}