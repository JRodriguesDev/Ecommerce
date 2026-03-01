'use server'

import {paymentMethods, removePaymentMethod} from '@/services/stripe/paymentMethod'
import {auth} from '@/lib/authjs/auth'
import { redirect } from 'next/navigation'

export const allPaymentMethodsAction = async () => {
    const session = await auth()
    if (!session!.user!.id) redirect('/auth/login')
    const methods = await paymentMethods(session!.user!.customerId)
    return methods
}

export const removePaymentMethodAction = async (paymentId: string) => {
    const session = await auth()
    if (!session!.user!.id) redirect('/auth/login')
    await removePaymentMethod(paymentId)
}