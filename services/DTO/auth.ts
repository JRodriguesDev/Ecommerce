import 'server-only'
import bcrypt from 'bcryptjs'
import { getVerifyLoginDB } from '../DAL/auth'

export const verifyLogin = async (email: string, password: string) => {
    const data = await getVerifyLoginDB(email)
    if (!data) throw new Error('User not found')
    const validated = await bcrypt.compare(password, data.password as string)
    if (!validated) throw new Error('Password incorrect')
    return data.twoFactor ? true : false
}   