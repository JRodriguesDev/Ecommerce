import 'server-only'

import prisma from '@/lib/prisma'
import {verifySession} from './auth'
import { email } from 'zod'


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
            twoFactorEnabled: isTwoFactorEnabled
        }
    })
}

export const securityResetPassword = async (userId: string, newPassword: string) => {
    await prisma.user.update({
        where: {id: userId},
        data: {password: newPassword}
    })
}