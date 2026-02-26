'use server'

import {retrieveSession} from '@/services/stripe/session'

export const retrieveCheckoutSessionAction = async (sessionId: string) => {
    return await retrieveSession(sessionId)
}
