import nextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from './credentials'

export const {handlers, signIn, signOut, auth} = nextAuth({
    providers: [
        Credentials,
        Google
    ],
})