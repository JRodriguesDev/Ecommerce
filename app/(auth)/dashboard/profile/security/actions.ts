'use server'
import {securityInfo, security2FaToggle, securityResetPassword} from '@/services/DAL/user'
import bcrypt from 'bcryptjs'

export const getSecurityInfomatios = async (userId: string) => {
    const data = await securityInfo(userId)
    return data
}

export const swith2Fa = async (userId: string, isTwoFactorEnabled: boolean) => {
    await security2FaToggle(userId, isTwoFactorEnabled)
}

export const resetPassword = async (userId:string, newPassword: string) => {
    const password = await bcrypt.hash(newPassword, 10)
    await securityResetPassword(userId, password)
}