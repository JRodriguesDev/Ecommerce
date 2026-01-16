import prisma from '../index'
import bcrypt from 'bcryptjs'
import {User} from '@/types/user'

export const userRegister = async (data: Omit<User, 'id'>) => {
    const user = await prisma.user.create({
        data: {
            ...data,
            password: await bcrypt.hash(data.password, 10)
        },
        select: {id: true}
    })
    prisma.$disconnect()
    return {id: user.id}
}

export const userLogin = async (data: Pick<User, 'email' | 'password'>) => {
    const user = await prisma.user.findUnique({
        where: {email: data.email},
        select: {id: true, password: true}
    })
    prisma.$disconnect()
    if (!user) return {sucess: false, error: 'Usuario nao encontrado'}
    const validated = await bcrypt.compare(data.password, user.password)
    if (!validated) return {sucess: false, error: 'Senha Incorreta'}
    return {sucess: true, id: user.id}
}