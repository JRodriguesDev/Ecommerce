import nextAuth from 'next-auth'

import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from '../prisma/index'
import Google from './providers/google'
import Credentials from './providers/credentials'
import {myCallback} from './configs/myCallback'
import {myEvents} from './configs/myEvents'

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
    events: myEvents
})