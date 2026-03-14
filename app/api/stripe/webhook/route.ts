import stripe from '@/lib/stripe/index'
import { NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'
import {subscriptionUpdate} from '@/services/DAL/subscription'

const webHookSecret = process.env.WEBHOOK_SECRET

export const POST = async (req: NextRequest) => {
    const body = await req.text()
    const sig = req.headers.get('stripe-signature')
    let event: Stripe.Event

    try {
        if (!sig || !webHookSecret) return NextResponse.json({error: 'Missing signature or secret'}, {status: 400})
        event = stripe.webhooks.constructEvent(body, sig, webHookSecret)

    } catch (err: any) {
            console.error(`⚠️ Webhook signature verification failed:`, err.message);
            return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }
    switch (event.type) {
        case 'checkout.session.completed':
            break
        case 'customer.subscription.updated':
            await subscriptionUpdate(event.data.object)
            break
    }
    return NextResponse.json({recived: true}, {status: 200})
}