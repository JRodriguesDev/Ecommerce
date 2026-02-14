import Credentials from 'next-auth/providers/credentials'
import {userLogin, twoFactorLogin} from '@/services/DAL/auth'

const myCredentials = Credentials({
    credentials: {
        email: {label: 'Email', type: 'email'},
        password: {label: 'Password', type: 'password'},
        is2FaVerified: {label: '2FA', type: 'text'}
    },
    async authorize(credentials) {
        if (credentials.is2FaVerified) {
            const user = await twoFactorLogin(credentials.email as string)
            if (!user) return null
            return {
                id: user.id,
                email: user.email,
                name: user.name,
                image: user.image
            }
        } 
        const result = await userLogin({
            email: credentials.email as string, 
            password: credentials.password as string
        })
        if (!result) return null
        return {
            id: result.id,
            email: result.email,
            name: result.name,
            image: result.image
        }
    }   
})

export default myCredentials