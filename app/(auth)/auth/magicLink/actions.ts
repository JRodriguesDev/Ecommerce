'use server'

import { FormState } from '../types'
import { emailSchema } from '../schema'
import {signIn} from '@/lib/authjs/auth'

export const magicLinkAction = async (prevState: FormState, form: FormData): Promise<FormState> => {
    const validateField = emailSchema.safeParse({
        email: form.get('email')
    })
    if (!validateField.success) return { success: false, error: validateField.error.flatten().fieldErrors.email?.[0] }
    const { email } = validateField.data
    await signIn("resend", {
        email,
        callbackUrl: '/shop' // Ajuste para sua rota principal
    })
    return {success: true}
}