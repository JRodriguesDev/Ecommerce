import prisma from '../index'

export const roleSeed = async () => {
    const roles = ['ADMIN', 'SELLER']
    await prisma.$transaction(async (prisma) => {
        for (const roleName of roles) {
            await prisma.role.upsert({
                where: {name: roleName},
                update: {},
                create: {name: roleName}
            })
        }   
    })
    console.log('✅ Synchronized roles!')
}