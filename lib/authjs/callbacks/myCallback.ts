import { NextAuthConfig } from "next-auth";
import {imageRegister} from '@/services/DAL/auth'

export const myCallback: NextAuthConfig['callbacks'] = {
    async jwt({token, user, account}) {
            if (user && account) {
                const image = await imageRegister(user.id!, account.provider, token.picture!)
                token.id = user.id
                token.picture = image?.mainImage || token.picture
            }
            return token
        },
        async session({session, token}) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.image = token.picture as string
            }
            return session
        }
}