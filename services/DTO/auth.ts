import 'server-only'
import bcrypt from 'bcryptjs'
import {getVerifyLogin} from '../DAL/auth'

export const verifyLogin = async (email: string, password: string) => {
    const data = await getVerifyLogin(email)
    const validated = await bcrypt.compare(password, data.password as string)
    if (!validated) if (!validated) throw new Error('Password incorrect')
    if (data.TwoFactor) return {twoFactor: true}
}