import 'server-only'

import stripe from '@/lib/stripe/index'

export const paymentMethods = async (customerId: string) => {
    const paymentMethod = await stripe.customers.listPaymentMethods(customerId)
    return paymentMethod.data.map(el => ({
        id: el.id,
        brand: el.card!.brand,
        last4: el.card!.last4,
        exp_month: el.card?.exp_month,
        exp_year: el.card?.exp_year,
        funding: el.card?.funding
    }))
} 

export const removePaymentMethod = async (paymentId: string) => {
    await stripe.paymentMethods.detach(paymentId)
}