import 'server-only'

import prisma from '@/lib/prisma/index'
import {Product} from '@/types/product'

export const toggleCartItemDB = async (userId: string, productId: string) => {
    const result = await prisma.$transaction(async (tx) => {
        const cart = await tx.cart.findUnique({
            where: {userId: userId},
            select: {id: true}
        })
        if (!cart) return {action: false}
        const existing = await tx.cartItem.findUnique({
            where: {cartId_productId: {
                cartId: cart!.id, productId: productId
            }}
        })
        if (existing) {
            await tx.cartItem.delete({
                where: {cartId_productId: {
                    cartId: cart.id, productId: productId
                }},
            })
            return {action: true}
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId: productId
                }
            })
            return {action: true}
        }
    })
}

export const isCart = async (userId: string, productId: string) => {
    const result = await prisma.$transaction(async (tx) => {
        const cart = await tx.cart.findUnique({
            where: {userId: userId},
            select: {id: true}
        })
        const item = await tx.cartItem.findUnique({
            where: {cartId_productId: {
                cartId: cart!.id, productId: productId
            }}
        })
        return item
    })
    return !!result
}

export const getCartProductsDB = async (userId: string) => {
    const result = await prisma.$transaction(async (tx) => {
        // 1. Busca os itens que estão no carrinho (ID e Quantidade)
        const cartData = await tx.cart.findUnique({
            where: { userId: userId },
            select: { 
                items: { 
                    select: { productId: true, quantity: true } 
                } 
            }
        })

        if (!cartData || cartData.items.length === 0) return []

        // 2. Pega apenas os IDs para fazer a busca no banco
        const ids = cartData.items.map(i => i.productId)

        // 3. Busca os detalhes dos produtos
        const productsInfo = await tx.product.findMany({
            where: { id: { in: ids } },
            select: {
                id: true,
                title: true,
                thumbnail: true,
                price: true,
                rating: true,
                slug: true,
                stock: true,
                description: true
            }
        })

        // 4. A MESCLAGEM:
        // Percorremos os itens do carrinho e "anexamos" o produto correspondente
        const mergedItems = cartData.items.map(cartItem => {
            const productDetails = productsInfo.find(p => p.id === cartItem.productId)
            
            return {
                ...productDetails, // Título, preço, etc.
                quantity: cartItem.quantity // A quantidade real do banco
            }
        }).filter((item): item is NonNullable<typeof item> => item !== undefined) as Product[];

        return mergedItems
    })
    
    return result
}

export const updateProductQuantityDB = async (userId: string, productId: string, newQuantity: number) => {
    await prisma.$transaction(async (tx) => {
        const cart = await tx.cart.findUnique({
            where: {userId: userId},
            select: {id: true}
        })
        await tx.cartItem.update({
            where: {cartId_productId: {
                cartId: cart!.id!, productId: productId
            }},
            data: {
                quantity: newQuantity
            }
        })
    })
}

export const cartCount = async (userId: string) => {
    const cartItems = await prisma.cart.findUnique({
        where: {userId: userId},
        select: {items: {
            select: {quantity: true}
        }}
    })
    if (!cartItems || !cartItems.items) return 0
    const count = cartItems?.items.reduce((acc, item) => {
        return acc + item.quantity
    }, 0)
    return count
}