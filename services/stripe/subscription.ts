import 'server-only'

import stripe from '@/lib/stripe/index'

export const cancelSubscription = async (subscriptionId: string) => {
    const subscription = await stripe.subscriptions.cancel(subscriptionId)
}

export const toggleChangeSubscription = async (subscriptionId: string, currentMethod: string) => {
    // 1. Lógica de inversão (Toggle)
    const newMethod = currentMethod === 'charge_automatically' 
        ? 'send_invoice' 
        : 'charge_automatically'
        
        // 2. Atualização na Stripe
        const subscription = await stripe.subscriptions.update(
            subscriptionId,
            {
                collection_method: newMethod,
                // Se for manual, definimos 7 dias para o vencimento. Se for auto, removemos.
                ...(newMethod === 'send_invoice' && { days_until_due: 7 })
            }
        )
        return subscription.collection_method
}

export const upgradePlan = async (subscriptionId: string) => {
    const subscription = await stripe.subscriptions.cancel(subscriptionId)
}