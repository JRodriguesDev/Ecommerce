import 'server-only'

import prisma from '@/lib/prisma'
import {verifySession} from './auth'


export const getProfile = async () => {
    const session = await verifySession()
    if (!session.isAuth) return null

    try {
        const data = await prisma.$transaction(async (prisma) => {
            const user = await prisma.user.findUnique({
                where: {id: session.userId},
                select: {
                    name: true,
                    email: true,
                    mainImage: true,
                    googleImage: true,
                    discordImage: true
                }
            })
            const accounts = await prisma.user.findUnique({
                where: {id: session.userId},
                select: {accounts: {select: {provider: true}}}
            })
            return {name: user?.name, email: user?.email, accounts: accounts?.accounts, images: {main: user?.mainImage, google: user?.googleImage, discord: user?.discordImage}}
        })
        return data
    } catch (err) {
        console.log('Failed to fetch user')
    return null
    }
}

export const getPerfil = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {id: userId},
        select: {name: true, email: true, mainImage: true}
    })
    return {name: user?.name, email: user?.email, image: user?.mainImage}
}

export const securityInfo = async (userId: string) => {
    const data = await prisma.user.findUnique({
        where: {id: userId},
        select: {twoFactorEnabled: true, password: true}
    })
    return {twoFactor: data?.twoFactorEnabled, password: data?.password ? true : false}
}

export const security2FaToggle = async (userId: string, isTwoFactorEnabled: boolean) => {
    await prisma.user.update({
        where: {id: userId},
        data: {
            twoFactor: {update: {
                twoFactorEnabled: isTwoFactorEnabled
            }}
        }
    })
}

export const securityResetPassword = async (userId: string, newPassword: string) => {
    await prisma.user.update({
        where: {id: userId},
        data: {password: newPassword}
    })
}

export const imageSwith = async (userId: string, imageUrl: string) => {
    if (!userId) return null
    await prisma.user.update({
        where: {id: userId},
        data: {mainImage: imageUrl}
    })
}

export const getMainImage = async (userId: string) => {
    const image = await prisma.user.findUnique({
        where: {id: userId},
        select: {mainImage: true}
    })
    return image?.mainImage
}

export const updateImage = async (userId: string, data: {discordImage: string} | {googleImage: string}) => {
    await prisma.user.update({
        where: {id: userId},
        data: {...data}
    })
}

export const userPlan = async (userId: string) => {
    const plan = await prisma.user.findUnique({
        where: {id: userId},
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
    const id = await prisma.user.findUnique({
        where: {id: userId},
        select: {stripeSubscriptionId: true, billingMethod: true}
    })
    return id
}

export const toggleSubscription = async (userId: string, newMethod: string) => {
    await prisma.user.update({
        where: {id: userId},
        data: {
            billingMethod: newMethod
        }
    })
} 

export const cancelPlan = async (userId: string) => {
    await prisma.user.update({
        where: {id: userId},
        data: {
            planId: null,
            stripeSubscriptionId: null,
            nextBillingDate: null
        }
    })
}

export const subscriptionId = async (userId: string) => {
    const id = await prisma.user.findUnique({
        where: {id: userId},
        select: {
            stripeSubscriptionId: true
        }  
    })
    return id?.stripeSubscriptionId
}