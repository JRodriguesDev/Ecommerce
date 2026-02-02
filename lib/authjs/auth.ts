import nextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from '../prisma/index'
import Credentials from './providers/credentials'

export const {handlers, signIn, signOut, auth} = nextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60
    },
    providers: [
        Credentials,
        Google
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id
                token.picture = user.image
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
    },
    events: {
        async signIn({user, account}) {
            console.log(`User: ${user.email} loggin from ${account?.provider}`)
        }
    }
})