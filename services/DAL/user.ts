import 'server-only'

import {auth} from '@/lib/authjs/auth'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'

export const veriftSession = async () => {
    const session = await auth()
    if(!session?.user?.id) redirect('/login')
    
    return {isAuth: true, userId: session.user.id}
}

export const getUser = async () => {
    const session = await veriftSession()
    if (!session) return null

    try {
        const data = await prisma.user.findUnique({
            where: {id: session.userId},
            select: {
                id: true,
                name: true,
                email: true,
                image: true
            }
        })
        return data
    } catch (err) {
        console.log('Failed to fetch user')
    return null
    }
}