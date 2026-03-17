import prisma from '../index'
import { revalidateTag } from 'next/cache'

export const planSeed = async () => {
    const plans = [
        {
            id: "plan_standard",
            name: "Standard",
            price: 0, // R$ 0,00
            description: "The basics to begin your journey.",
            features: ["Access to the full store", "Order history", "Email support"],
            status: true,
            tier: 0,
            icon: "LuStar", // Nome do ícone para o IconRenderer
        },
        {
            id: "plan_pro",
            name: "Pro Logistics",
            price: 1990, // R$ 19,90
            description: "Forget about delivery fees on all your purchases.",
            features: [
                "Free shipping sitewide.", 
                "Priority Delivery (Sedex)", 
                "Real-Time Tracking",
                "24/7 VIP Support"
            ],
            tier: 1,
            status: true,
            icon: "LuTruck",
        },
        {
            id: "plan_elite",
            name: "Elite VIP",
            price: 4990, // R$ 49,90
            description: "Maximum savings with discounts.",
            features: [
                "Everything from Logistics Pro", 
                "15% OFF on the entire catalog", 
                "Early access to Drops",
                "Exclusive monthly gift"
            ],
            tier: 2,
            status: true,
            icon: "LuCrown",
        }
    ]

    console.log("🌱 Iniciar seed de planos...")
    const existingPlan = await prisma.plan.count()
    if (existingPlan > 0) return console.log('✅ Plans already exist. Skipping seed.')

    for (const plan of plans) {
        await prisma.plan.upsert({
            where: { id: plan.id },
            update: {},
            create: {
                name: plan.name,
                price: plan.price,
                description: plan.description,// Se seu campo for String no Prisma
                features: plan.features, // Se seu campo for String[] (Postgres/Mongo)
                icon: plan.icon,
                tier: plan.tier
            }
        })
    }
    revalidateTag('plans-tag', 'max')

    console.log("✅ Seed de planos finalizada!")
}