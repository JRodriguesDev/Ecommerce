'use server'

import { auth } from '@/lib/authjs/auth'
import { redirect } from 'next/navigation'
import {getOrder} from '@/services/DAL/order'

export const allOrdersAction = async () => {
    const session = await auth()
    if (!session!.user!.id) redirect('/auth/login')
    const order = await getOrder(session!.user!.id)
    return order
}

