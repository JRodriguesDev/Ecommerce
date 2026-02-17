import {adminSeed} from './admin'
import {roleSeed} from './role'
import {productsSeed} from './product'
import prisma from '../index'

(async() => {
    try {
        console.log('🌱 Starting seed...')
        await roleSeed()
        await adminSeed()
        await productsSeed()
        console.log('✅ All seeds completed successfully!')
    } catch (err) {
        console.error('❌ Error during seed:', err)
    }
    finally {
        await prisma.$disconnect()
    }
})()