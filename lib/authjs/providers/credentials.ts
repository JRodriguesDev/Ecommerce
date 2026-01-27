import Credentials from 'next-auth/providers/credentials'
import {userLogin} from '@/services/DAL/auth'

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
        if (!result) return null
        return {
            id: result.id,
            email: result.email,
            name: result.name,
        }
    }   
})

export default myCredentials