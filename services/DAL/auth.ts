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

export const userRegister = async (data: Omit<User, 'id'>) => {
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
        select: {id: true, name: true, email: true, password: true}
    })
    if (!user || !user.password) throw new Error('User not found')
    const validated = await bcrypt.compare(data.password, user.password)
    if (!validated) throw new Error('Password incorrect')
    return {id: user.id, name: user.name, email: user.email}
}