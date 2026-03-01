import prisma from '@/lib/prisma'
import 'server-only'

export const allPlans = async () => {
    try {
        const plans = await prisma.plan.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                features: true,
                icon: true
            }
        })

        // Se plans for null ou undefined (raro no findMany), retorna []
        return plans ?? []
        
    } catch (error) {
        console.error("Erro ao buscar planos:", error)
        // Em caso de erro crítico no banco, retorna array vazio para não quebrar o .map() no front
        return []
    }
}