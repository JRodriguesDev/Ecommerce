import Credentials from 'next-auth/providers/credentials'
import {userLogin} from '@/lib/prisma/routes/auth'

const myCredentials = Credentials({
    credentials: {
    email: {label: 'Email', type: 'email'},
    password: {label: 'Password', type: 'password'}
    },
    async authorize(credentials) {
        const result = await userLogin({
            email: credentials.email as string, 
            password: credentials.password as string
        })
        if (!result.sucess || !result.user) return null
        return {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
        }
    }
})

export default myCredentials