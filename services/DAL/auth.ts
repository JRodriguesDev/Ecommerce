import 'server-only'

import prisma from '../../lib/prisma/index'
import bcrypt from 'bcryptjs'
import { auth } from '@/lib/authjs/auth'
import { redirect } from 'next/navigation'

export const getVerifyLoginDB = async (email: string) => {
    const data = await prisma.user.findUnique({
        where: { email: email },
        select: { password: true, twoFactorEnabled: true }
    })
    if (!data) return null
    return { password: data.password, twoFactor: data.twoFactorEnabled }
}

export const setTwoFactorDB = async (email: string, token: string, secret: string) => {
    const user = await prisma.user.update({
        where: { email: email },
        data: {
            twoFactor: {
                update: {
                    twoFactorToken: token,
                    twoFactorSecret: secret
                }
            }
        },
        select: { id: true }
    })
    return user.id
}

export const userRegisterDB = async (name: string, email: string, password: string, customerId: string) => {
    const userId = await prisma.$transaction(async (prisma) => {
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: await bcrypt.hash(password, 10),
                customerId: customerId
            },
            select: { id: true }
        })
        return newUser.id
    })
    await userTwoFactorCreateDB(userId)
    await userCartCreateDB(userId)
}

export const userTwoFactorCreateDB = async (userId: string) => {
    await prisma.twoFactor.create({
        data: {
            user: { connect: { id: userId } }
        }
    })
}

export const userCartCreateDB = async (userId: string) => {
    await prisma.cart.create({
        data: {
            user: { connect: { id: userId } }
        }
    })
}

export const userLoginDB = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: { email: email },
        select: { id: true, name: true, email: true, password: true, mainImage: true }
    })
    if (!user) return
    return { id: user.id, name: user.name, email: user.email, password: user.password!, image: user.mainImage }
}


export const verifySession = async () => {
    const session = await auth()
    if (!session?.user?.id) redirect('/login')

    return { isAuth: true, userId: session.user.id }
}

export const imageRegister = async (userId: string, provider: string, imageURL: string) => {
    switch (provider) {
        case 'google':
            return await prisma.user.update({
                where: { id: userId },
                data: { googleImage: imageURL },
                select: { mainImage: true }
            })
        case 'discord':
            return await prisma.user.update({
                where: { id: userId },
                data: { discordImage: imageURL },
                select: { mainImage: true }
            })
    }
}

export const unlikedProvider = async (userId: string, provider: string) => {
    const providerImage = provider == 'google' ? { googleImage: null } : { discordImage: null }
    await prisma.$transaction(async (prisma) => {
        await prisma.account.deleteMany({
            where: { userId: userId, provider: provider }
        })
        await prisma.user.update({
            where: { id: userId },
            data: { mainImage: '', ...providerImage }
        })
    })
}

export const completeRegister = async (userId: string, name: string, password: string, customerId: string) => {
    await prisma.user.update({
        where: { id: userId },
        data: { name: name, password, customerId: customerId }
    })
}

export const verifyProfile = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true, password: true }
    })
    return { name: user!.name ? true : false, password: user?.password ? true : false }
}

export const verifyTwoFactor = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { email: true, twoFactorToken: true }
    })
    return { token: user?.twoFactorToken, email: user?.email }
}

export const twoFactorLogin = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: { email: email },
        select: { id: true, name: true, email: true, password: true, mainImage: true }
    })
    return { id: user?.id, name: user?.name, email: user?.email, image: user?.mainImage }
}

export const getRoles = async (userId: string) => {
    const roles = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            role: { select: { role: { select: { name: true } } } }
        }
    })
    return roles?.role.map((el) => el.role.name)
}

export const getCustomerId = async (userId: string) => {
    const id = await prisma.user.findUnique({
        where: { id: userId },
        select: { customerId: true }
    })
    return id?.customerId
}