import { NextAuthConfig } from "next-auth";
import {getMainImage} from '@/services/DAL/auth'

export const myCallback: NextAuthConfig['callbacks'] = {
    async jwt({token, user, trigger, session}) {
            if (user) {
                token.id = user.id
                const mainImage = await getMainImage(user.id!)
                token.picture = mainImage || user.image
            }
            if (trigger === 'update' && session?.image) {
                token.picture = session.image
            }
            return token
        },

    async session({token, session}) {
        if (session.user && token.id) {
            session.user.id = token.id as string
            session.user.image = token.picture
        }
        return session
    }
}
