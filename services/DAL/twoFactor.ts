import 'server-only'

import prisma from '@/lib/prisma/index'

export const security2FaToggleDB = async (userId: string, isTwoFactorEnabled: boolean) => {
    await prisma.twoFactor.update({
        where: { userId: userId },
        data: {
            twoFactorEnabled: isTwoFactorEnabled
        }
    })
}