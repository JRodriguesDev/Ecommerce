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

export const securityInfoDB = async (userId: string) => {
    const data = await prisma.user.findUnique({
        where: {id: userId},
        select: {
            password: true,
            twoFactor: {select: {
                twoFactorEnabled: true
            }}
        }
    })
    if (!data) return null
    return {twoFactor: data.twoFactor!.twoFactorEnabled, password: data.password ? true : false}
}

export const securityResetPasswordDB = async (userId: string, newPassword: string) => {
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
