import 'server-only'

import { cacheTag } from 'next/cache'
import {auth} from '@/lib/authjs/auth'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'

export const verifySession = async () => {
    'use cache'
    const session = await auth()
    if(!session?.user?.id) redirect('/login')
    cacheTag(`session_${session.user.id}`)
    
    return {isAuth: true, userId: session.user.id}
}

export const getProfile = async () => {
    'use cache'
    const session = await verifySession()
    if (!session) return null
    cacheTag(`sessionUser_${session.userId}`)

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