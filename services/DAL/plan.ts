import 'server-only'

import prisma from '@/lib/prisma'
import type { Stripe } from 'stripe'
import { unstable_cache as nextCache, revalidateTag } from 'next/cache'

export const allPlans = async () => {
    try {
        const dataCached = nextCache(
            async () => {
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
            },
            [`plans-key`],
            {
                tags: ['plans-tag'],
                revalidate: false
            }
        )
        const data = await dataCached()
        return data
    } catch (error) {
        console.error("Erro ao buscar planos:", error)
        // Em caso de erro crítico no banco, retorna array vazio para não quebrar o .map() no front
        return []
    }
}

export const getPlan = async (planId: string) => {
    const plan = await prisma.plan.findUnique({
        where: { id: planId },
        select: {
            id: true,
            name: true,
            price: true,
            description: true,
        }
    })
    return plan
}

export const userCheckPlan = async (userId: string) => {
    // Busca o usuário e seleciona apenas o planId
    const user = await prisma.subscription.findUnique({
        where: { id: userId },
        select: {
            planId: true
        }
    })

    // Se o usuário não existir ou não tiver plano, retorna null
    return user?.planId || null
}

type typeSession = Stripe.Checkout.Session

export const processPlan = async (userId: string, session: typeSession) => {
    const subscription = session.subscription as Stripe.Subscription;

    // Pegando o ID do plano do metadata (Cuidado com o nome 'plandId' vs 'planId')
    const planIdFromMetadata = session.line_items!.data[0].metadata!.plandId;

    await prisma.subscription.upsert({
        where: {
            userId: userId
        },
        update: {
            planId: planIdFromMetadata,
            stripeSubscriptionId: subscription.id,
            status: subscription.status,
            nextBillingDate: new Date(subscription.items.data[0].current_period_end * 1000),
            billingMethod: subscription.collection_method
            // Adicione outros campos que deseja atualizar
        },
        create: {
            userId: userId,
            planId: planIdFromMetadata,
            stripeSubscriptionId: subscription.id,
            status: subscription.status,
            nextBillingDate: new Date(subscription.items.data[0].current_period_end * 1000),
            billingMethod: subscription.collection_method
            // Campos obrigatórios para criação
        },
    });
    revalidateTag(`user-plan-tag-${userId}`, 'max')
}