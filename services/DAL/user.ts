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