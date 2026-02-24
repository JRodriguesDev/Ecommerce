import 'server-only'

import stripe from '@/lib/stripe/index'
import {User} from '@/types/user'

export const createCustomer = async (name: string, email: string) => {
    const customer = await stripe.customers.create({
        name: name,
        email: email
    })
    return customer.id
}