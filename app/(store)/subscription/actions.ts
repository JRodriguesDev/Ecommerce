'use server'

import {allPlans} from '@/services/DAL/plan'

export const allPlansAction = async () => {
    const plans = await allPlans()
    return plans
}