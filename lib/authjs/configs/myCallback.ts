import { NextAuthConfig } from "next-auth";
import { userProfileDB } from '@/services/DAL/auth'
import { imageSwith } from '@/services/DAL/user'
import { cartCount } from '@/services/DAL/cart'
import { auth } from '../auth'

export const myCallback: NextAuthConfig['callbacks'] = {
    async signIn({ account, profile }) {
        const session = await auth()
        if (session && (account?.type == 'oauth' || account?.type == 'oidc')) {
            const newEmail = profile?.email
            const currentEmail = session.user?.email
            if (newEmail !== currentEmail) return `/auth/errorLinking?error=EmailMismatch`
        }
        return true
    },

    async jwt({ token, user, trigger, session }) {
        if (user) {
            const data = await userProfileDB(user.id!)
            if (!data) return null
            token.id = user.id
            token.customerId = data.customerId
            token.cartCount = await cartCount(user.id!)
            token.picture = data.mainImage || user.image
            token.needsProfile = !data.hasName || !data.hasPassword
        }
        if (trigger == 'update' && !session.customer) {
            const data = await userProfileDB(token.id as string)
            if (!data) return null
            token.customerId = data.customerId
        }
        if (trigger == 'update' && !session.needsProfile) {
            token.needsProfile = session.needsProfile
        }
        if (trigger === 'update' && session.image) {
            await imageSwith(token.id as string, session.image)
            token.picture = session.image
        }
        if (trigger === 'update' && session.countUpdate) {
            const count = await cartCount(token.id as string)
            token.cartCount = count
        }
        return token
    },
    async session({ token, session }) {
        if (session.user && token.id) {

            session.user.id = token.id as string
            session.user.image = token.picture
            session.user.customerId = token.customerId as string
            session.user.needsProfile = token.needsProfile as boolean
            session.user.cartCount = token.cartCount as number
        }
        return session
    }
}
