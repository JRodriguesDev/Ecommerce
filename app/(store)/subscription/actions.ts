'use server'

import {allPlans} from '@/services/DAL/plan'
import {userPlan} from '@/services/DAL/user'
import {auth} from '@/lib/authjs/auth'
import { redirect } from 'next/navigation'

export const allPlansAction = async () => {
    const plans = await allPlans()
    return plans
}

export const userPlanAction = async () => {
    const session = await auth()
    if (!session!.user!.id) redirect('/auth/login')
    const plan = await userPlan(session!.user!.id)
    return plan.id
}