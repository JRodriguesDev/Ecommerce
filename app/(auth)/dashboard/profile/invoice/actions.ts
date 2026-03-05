'use server'

import {auth} from '@/lib/authjs/auth'
import { redirect } from 'next/navigation'
import {subscriptionId} from '@/services/DAL/user'
import {listInvoices} from '@/services/stripe/invoice'

export const listInvoicesAction = async () => {
    const session = await auth()
    if (!session!.user!.id) redirect('/auth/login')
    const subscription = await subscriptionId(session!.user!.id)
    const invoices = await listInvoices(session!.user!.customerId!, subscription!)
    return invoices
}