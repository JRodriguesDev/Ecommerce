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

export const imageSwith = async (userId: string, imageUrl: string) => {
    if (!userId) return null
    await prisma.user.update({
        where: {id: userId},
        data: {mainImage: imageUrl}
    })
}

export const userRegister = async (data: Pick<User, 'name' | 'email' | 'password'>) => {
    await prisma.user.create({
        data: {
            ...data,
            password: await bcrypt.hash(data.password, 10)
        }
    })
}

export const userLogin = async (data: Pick<User, 'email' | 'password'>) => {
    const user = await prisma.user.findUnique({
        where: {email: data.email},
        select: {id: true, name: true, email: true, password: true, image: true}
    })
    if (!user || !user.password) throw new Error('User not found')
    const validated = await bcrypt.compare(data.password, user.password)
    if (!validated) throw new Error('Password incorrect')
    return {id: user.id, name: user.name, email: user.email, image: user.image}
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

export const nameRegister = async (userId: string, name: string) => {
    await prisma.user.update({
        where: {id: userId},
        data: {name: name}
    })
}