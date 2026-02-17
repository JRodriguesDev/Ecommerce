import bcrypt from "bcryptjs";
import prisma from '../index'

export const adminSeed = async () => {
    const adminEmail = 'admin@admin.com'
    const adminPassword = await bcrypt.hash('admin123', 10)

    const adminRole = await prisma.role.findUnique({
        where: {name: 'ADMIN'},
        select: {name: true}
    })
    if (!adminRole) throw new Error('Role ADMIN not found. Run roleSeed first!')
    await prisma.user.upsert({
        where: {email: adminEmail},
        update: {},
        create: {
            name: 'admin',
            email: adminEmail,
            password: adminPassword,
            role: {
                create: {role: {connect: {name: 'ADMIN'}}}
            }
        }
    })
    console.log('✅ Admin seed completed!')
}