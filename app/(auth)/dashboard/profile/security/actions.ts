import {securityInfo} from '@/services/DAL/user'

export const getSecurityInfomatios = async (userId: string) => {
    const data = await securityInfo(userId)
    return data
}