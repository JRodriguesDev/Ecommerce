import 'server-only'

import { cacheTag } from 'next/cache'
import prisma from '@/lib/prisma'
import {verifySession} from './auth'


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