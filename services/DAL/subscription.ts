import 'server-only'

import prisma from '@/lib/prisma'

export const userPlan = async (userId: string) => {

    const plan = await prisma.subscription.findUnique({
        where: {userId: userId},
        select: {
            nextBillingDate: true,
            billingMethod: true,
            plan: {select: {
                id: true,
                name: true,
                price: true,
                description: true,
                features: true,
                tier: true,
            }}
        }
    })
    return { nextBillingDate: plan?.nextBillingDate, billingMethod: plan?.billingMethod, ...plan?.plan}
}

export const userSubcription = async (userId: string) => {
    const id = await prisma.subscription.findUnique({
        where: {userId: userId},
        select: {stripeSubscriptionId: true, billingMethod: true}
    })
    return id
}

export const toggleSubscription = async (userId: string, newMethod: string) => {
    await prisma.subscription.update({
        where: {userId: userId},
        data: {
            billingMethod: newMethod
        }
    })
} 

export const cancelPlan = async (userId: string) => {
    await prisma.subscription.update({
        where: {userId: userId},
        data: {
            planId: null,
            stripeSubscriptionId: null,
            nextBillingDate: null
        }
    })
}

export const subscriptionId = async (userId: string) => {
    const id = await prisma.subscription.findUnique({
        where: {userId: userId},
        select: {
            stripeSubscriptionId: true
        }  
    })
    return id?.stripeSubscriptionId
}