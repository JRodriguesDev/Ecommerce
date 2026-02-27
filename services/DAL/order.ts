import 'server-only'

import prisma from "@/lib/prisma"
import {Product} from '@/types/product'
import type {Stripe} from 'stripe'

type typeSession = Stripe.Checkout.Session

export const processOrder = async (userId: string, session: typeSession, data: Product[]) => {
    const existingOrder = await prisma.order.findUnique({
        where: {stripeSessionId: session.id}
    })
    if (existingOrder) return null
    await prisma.$transaction(async (tx) => {
        for (const item of data) {
            await tx.product.update({
                where: {id: item.id},
                data: {
                    stock: {decrement: item.quantity}
                }
            })
        }
        await tx.order.create({
            data: {
                userId: userId,
                status: 'paid',
                stripeSessionId: session.id,
                totalAmount: session.amount_total!,
                products: data.map(p => ({
                    productId: p.id,
                    title: p.title,
                    thumbnail: p.thumbnail,
                    price: p.price,
                    quantity: p.quantity
                }))
            }
        })
        await tx.cartItem.deleteMany({
            where: {
                cart: {userId: userId}
            }
        })
    })
}