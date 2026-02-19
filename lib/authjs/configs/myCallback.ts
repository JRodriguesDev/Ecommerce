import { NextAuthConfig } from "next-auth";
import {verifyProfile, getRoles} from '@/services/DAL/auth'
import {getMainImage, imageSwith} from '@/services/DAL/user'
import {auth} from '../auth'

export const myCallback: NextAuthConfig['callbacks'] = {
    async signIn({account, profile}) {
        const session = await auth()
        if (session && (account?.type == 'oauth' || account?.type == 'oidc')) {
            const newEmail = profile?.email
            const currentEmail = session.user?.email
            if (newEmail !== currentEmail) return `/auth/errorLinking?error=EmailMismatch`
        }
        return true
    },

    async jwt({token, user, trigger, session}) {
            if (user) {
                const security = await verifyProfile(user.id!)
                const roles = await getRoles(user.id!) ?? []
                console.log(roles)
                token.roles = roles
                token.id = user.id
                const mainImage = await getMainImage(user.id!)
                token.picture = mainImage || user.image
                token.needsProfile = !security.name || !security.password
            }
            if (trigger == 'update' && !session.needsProfile) {
                token.needsProfile = session.needsProfile
            }
            if (trigger === 'update' && session.image) {
                await imageSwith(token.id as string, session.image)
                token.picture = session.image
            }
            return token
        },

    async session({token, session}) {
        if (session.user && token.id) {
            session.user.id = token.id as string
            session.user.image = token.picture
            session.user.needsProfile = token.needsProfile
        }
        return session
    }
}
