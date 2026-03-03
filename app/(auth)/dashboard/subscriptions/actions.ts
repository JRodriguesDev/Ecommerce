'use server'

import {auth} from '@/lib/authjs/auth'
import { redirect } from 'next/navigation'
import {userPlan, userSubcription, cancelPlan} from '@/services/DAL/user'
import {cancelSubscription} from '@/services/stripe/subscription'

export const planAction = async () => {
    const session = await auth()
    if (!session!.user!.id) redirect('/auth/login') 
    const plan = await userPlan(session!.user!.id)
    return plan
}

export const userPlanAction = async () => {
    const session = await auth()
    if (!session!.user!.id) redirect('/auth/login') 
}

export const cancelPlanAction = async () => {
    const session = await auth()
    if (!session!.user!.id) redirect('/auth/login') 
    const subscriptionId = await userSubcription(session!.user!.id)
    await cancelSubscription(subscriptionId!)
    await cancelPlan(session!.user!.id)
}