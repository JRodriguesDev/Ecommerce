import prisma from '../../lib/prisma/index'
import bcrypt from 'bcryptjs'
import {User} from '@/types/user'

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