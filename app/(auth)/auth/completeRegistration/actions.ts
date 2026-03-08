'use server'

import {completeRegisterSchema} from '../schema'
import {completeRegisterDB} from '@/services/DAL/auth'
import {createCustomer} from '@/services/stripe/customer'
import {auth} from '@/lib/authjs/auth'
import {FormState} from '../types'
import bcrypt from 'bcryptjs'

export const completeRegistrationAction = async (prevState: FormState, form: FormData): Promise<FormState> => {
    const session = await auth()
    if (!session?.user?.id) return { success: false, error: "Session Error" }
    const validatedFields = completeRegisterSchema.safeParse({
        name: form.get('name'), 
        password: form.get('password')})
    if (!validatedFields.success) {
        const fieldsErros = validatedFields.error.flatten().fieldErrors
        const errorMessage = fieldsErros.name?.[0] || fieldsErros.password?.[0]
        return {success: false, error: errorMessage}
    }
    validatedFields.data.password = await bcrypt.hash(validatedFields.data.password, 10)
    const {name, password} = validatedFields.data
    try {
        const customerId = await createCustomer(name, session.user.email!)
        await completeRegisterDB(session.user.id, name, password, customerId)
    } catch (err) {
        return { success: false, error: ' Name registration failed. Please try again.'}
    }
    return {success: true}
}