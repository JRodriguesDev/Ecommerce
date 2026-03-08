'use server'

import { securityInfoDB, securityResetPasswordDB } from '@/services/DAL/user'
import { security2FaToggleDB } from '@/services/DAL/twoFactor'
import bcrypt from 'bcryptjs'
import { auth } from '@/lib/authjs/auth'
import { redirect } from 'next/navigation'
import {resetPasswordSchema} from './schema'

export const getSecurityInfomatiosAction = async () => {
    const session = await auth()
    if (!session?.user.id) redirect('/auth/login')
    const userId = session!.user!.id
    const data = await securityInfoDB(userId)
    return data
}

export const swith2FaAction = async (isTwoFactorEnabled: boolean) => {
    const session = await auth()
    if (!session?.user.id) redirect('/auth/login')
    const userId = session!.user!.id
    await security2FaToggleDB(userId, isTwoFactorEnabled)
}

export const resetPasswordAction = async (newPassword: string) => {
    const session = await auth()
    if (!session?.user.id) redirect('/auth/login')
    const userId = session!.user!.id
    const validatePass = resetPasswordSchema.safeParse({password: newPassword})
    if (!validatePass.success) return { success: false, error: validatePass.error.flatten().fieldErrors.password?.[0] }
    const password = await bcrypt.hash(newPassword, 10)
    await securityResetPasswordDB(userId, password)
}