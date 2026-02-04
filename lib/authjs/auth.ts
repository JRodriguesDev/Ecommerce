import nextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from '../prisma/index'
import Credentials from './providers/credentials'
import {myCallback} from './callbacks/myCallback'

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
    callbacks: myCallback,
    events: {
        async signIn({user, account}) {
            console.log(`User: ${user.email} loggin from ${account?.provider}`)
        }
    }
})