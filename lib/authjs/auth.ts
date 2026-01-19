import nextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from '../prisma/index'
import Credentials from './providers/credentials'

export const {handlers, signIn, signOut, auth} = nextAuth({
    adapter: PrismaAdapter(prisma),
    session: {strategy: 'database'},
    providers: [
        Credentials,
        Google
    ],
})