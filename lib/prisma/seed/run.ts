import {productsSeed} from './product'
import {planSeed} from './plan'
import prisma from '../index'

(async() => {
    try {
        console.log('🌱 Starting seed...')
        await productsSeed()
        await planSeed()
        console.log('✅ All seeds completed successfully!')
    } catch (err) {
        console.error('❌ Error during seed:', err)
    }
    finally {
        await prisma.$disconnect()
    }
})()