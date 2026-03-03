import 'server-only'

import stripe from '@/lib/stripe/index'

export const cancelSubscription = async (subscriptionId: string) => {
    const subscription = await stripe.subscriptions.cancel(subscriptionId)
}