import Credentials from 'next-auth/providers/credentials'
import { userLoginDB, twoFactorLogin } from '@/services/DAL/auth'
import bcrypt from 'bcryptjs'

const myCredentials = Credentials({
    credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        //is2FaVerified: { label: '2FA', type: 'text' }
    },
    async authorize(credentials) {
        const email = credentials.email as string
        const password = credentials.password as string
        const result = await userLoginDB(email)
        if (!result) return null
        const validated = await bcrypt.compare(password, result.password)
        if (!validated) return null
        return {
            id: result.id,
            email: result.email,
            name: result.name,
            image: result.image
        }
    }
})

export default myCredentials