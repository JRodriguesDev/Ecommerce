import Resend from 'next-auth/providers/resend'
import { sendVerificationRequest } from '@/lib/resend/authjs/sender'

const resend = Resend({
    apiKey: process.env.AUTH_RESEND_KEY,
    from: 'onboarding@resend.dev',
    name: 'Ecommerce',
    sendVerificationRequest
})

export default resend