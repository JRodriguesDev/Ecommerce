'use server'

import { auth } from '@/lib/authjs/auth'
import { getCartProductsDB } from '@/services/DAL/cart'
import { createSession, createSubscriptionSession } from '@/services/stripe/session'
import { productsModeDTO, subscriptionDTO } from '@/services/DTO/stripe'
import { redirect } from 'next/navigation'
import { Product } from '@/types/product'
import { userCheckPlan, getPlan } from '@/services/DAL/plan'
import { userSubcription, userPlan } from '@/services/DAL/subscription'

export const cartProductsAction = async () => {
    const session = await auth()
    if (!session?.user?.id) redirect('/auth/login')
    const products = await getCartProductsDB(session.user.id)
    return products
}

export const createCheckoutAction = async (products: Product[], type: string) => {
    const session = await auth()
    if (!session?.user?.id) redirect('/auth/login')
    const customerId = session!.user.customerId
    const plan = await userPlan(session.user.id)
    const stripeData = productsModeDTO(products, plan.tier!)
    return await createSession(stripeData, customerId, type)
}

export const planCheckAction = async (planId: string) => {
    const session = await auth()
    if (!session?.user?.id) redirect('/auth/login')
    const userPlan = await userCheckPlan(session!.user.id)
    if (planId == userPlan) redirect('/subscription')
}

export const createCheckoutSubscriptionAction = async (planId: string, type: string) => {
    const session = await auth()
    if (!session?.user?.id) redirect('/auth/login')
    const plan = await getPlan(planId)
    const subscription = subscriptionDTO(plan)
    const subscriptionId = await userSubcription(session!.user!.id)
    return await createSubscriptionSession(subscription, session!.user!.customerId, type, subscriptionId?.stripeSubscriptionId)
}

