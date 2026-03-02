import prisma from '../index'

export const planSeed = async () => {
    const plans = [
        {
            id: "plan_standard",
            name: "Standard",
            price: 0, // R$ 0,00
            description: "O básico para começar sua jornada.",
            features: ["Acesso à loja completa", "Histórico de pedidos", "Suporte via e-mail"],
            status: true,
            icon: "LuStar", // Nome do ícone para o IconRenderer
        },
        {
            id: "plan_pro",
            name: "Logística Pro",
            price: 1990, // R$ 19,90
            description: "Esqueça as taxas de entrega em todas as suas compras.",
            features: [
                "Frete Grátis em todo o site", 
                "Entrega Prioritária (Sedex)", 
                "Rastreamento em Tempo Real",
                "Suporte VIP 24/7"
            ],
            status: true,
            icon: "LuTruck",
        },
        {
            id: "plan_elite",
            name: "Elite VIP",
            price: 4990, // R$ 49,90
            description: "O máximo de economia com descontos.",
            features: [
                "Tudo do Logística Pro", 
                "15% OFF em todo o catálogo", 
                "Acesso antecipado a Drops",
                "Brinde exclusivo mensal"
            ],
            status: true,
            icon: "LuCrown",
        }
    ]

    console.log("🌱 Iniciar seed de planos...")

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
            }
        })
    }

    console.log("✅ Seed de planos finalizada!")
}