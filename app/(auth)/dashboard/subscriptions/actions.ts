'use server'

import {auth} from '@/lib/authjs/auth'
import { redirect } from 'next/navigation'
import {userPlan} from '@/services/DAL/user'

export const planAction = async () => {
    const session = await auth()
    if (!session!.user!.id) redirect('/auth/login') 
    const plan = await userPlan(session!.user!.id)
    return plan
}