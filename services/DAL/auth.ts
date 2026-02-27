import 'server-only'

import prisma from '../../lib/prisma/index'
import bcrypt from 'bcryptjs'
import {User} from '@/types/user'
import {auth} from '@/lib/authjs/auth'
import { redirect } from 'next/navigation'

export const verifySession = async () => {
    const session = await auth()
    if(!session?.user?.id) redirect('/login')
    
    return {isAuth: true, userId: session.user.id}
}

export const imageRegister = async (userId: string, provider: string, imageURL: string) => {
    switch (provider) {
        case 'google':
            return  await prisma.user.update({
                where: {id: userId},
                data: {googleImage: imageURL},
                select: {mainImage: true}
            })
        case 'discord':
            return await prisma.user.update({
                where: {id: userId},
                data: {discordImage: imageURL},
                select: {mainImage: true}
            })
    }
}

export const userRegister = async (data: Pick<User, 'name' | 'email' | 'password'>, customerId: string) => {
    const user = await prisma.$transaction(async (prisma) => {
        const newUser = await prisma.user.create({
            data: {
                ...data,
                customerId: customerId,
                password: await bcrypt.hash(data.password, 10)
            },
            select: {id: true}
        })
        return newUser
    })
    await userCartCreate(user.id)
}

export const userCartCreate = async (userId: string) => {
    console.log(userId)
    await prisma.cart.create({
        data: {
            user: {connect: {id: userId}}
        }
    })
}

export const userLogin = async (data: Pick<User, 'email' | 'password'>) => {
    const user = await prisma.user.findUnique({
        where: {email: data.email},
        select: {id: true, name: true, email: true, password: true, mainImage: true}
    })
    if (!user || !user.password) throw new Error('User not found')
    const validated = await bcrypt.compare(data.password, user.password)
    if (!validated) throw new Error('Password incorrect')
    return {id: user.id, name: user.name, email: user.email, image: user.mainImage}
}

export const unlikedProvider = async (userId: string, provider: string) => {
    const providerImage = provider == 'google' ?  {googleImage: null} : {discordImage: null} 
    await prisma.$transaction(async (prisma) => {
        await prisma.account.deleteMany({
            where: {userId: userId, provider: provider}
        })
        await prisma.user.update({
            where: {id: userId},
            data: {mainImage: '', ...providerImage}
        })
    })
}

export const completeRegister = async (userId: string, name: string, password: string, customerId: string) => {
    await prisma.user.update({
        where: {id: userId},
        data: {name: name, password, customerId: customerId}
    })
}

export const verifyProfile = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {id: userId},
        select: {name: true, password: true}
    })
    return {name: user!.name ? true : false, password: user?.password ? true : false}
}

export const getVerifyLogin = async (email: string) => {
    const data = await prisma.user.findUnique({
        where: {email: email},
        select: {password: true, twoFactorEnabled: true}
    })
    return  {password: data?.password, TwoFactor: data?.twoFactorEnabled}
}

export const setTwoFactor = async (email: string, token: string, secret: string) => {
    const user = await prisma.user.update({
        where: {email: email},
        data: {
            twoFactorSecret: secret,
            twoFactorToken: token
        },
        select: {id: true}
    })
    return user.id
}

export const verifyTwoFactor = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {id: userId},
        select: {email: true, twoFactorToken: true}
    })
    return {token: user?.twoFactorToken, email: user?.email}
}

export const twoFactorLogin = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {email: email},
        select: {id: true, name: true, email: true, password: true, mainImage: true}
    })
    return {id: user?.id, name: user?.name, email: user?.email, image: user?.mainImage}
}
    
export const getRoles = async (userId: string) => {
    const roles = await prisma.user.findUnique({
        where: {id: userId},
        select: {
            role: {select: {role: {select: {name: true}}}}
        }
    })
    return roles?.role.map((el) => el.role.name)
}

export const getCustomerId = async (userId: string) => {
    const id = await prisma.user.findUnique({
        where: {id: userId},
        select: {customerId: true}
    })
    return id?.customerId
}