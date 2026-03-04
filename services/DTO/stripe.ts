import 'server-only'
import { Product } from '@/types/product'
import type { Stripe } from 'stripe'

type stripeLineItems = Stripe.Checkout.SessionCreateParams.LineItem

export const productsModeDTO = (
    data: Pick<Product, 'id' | 'title' | 'price' | 'quantity' | 'description' | 'rating' | 'stock' | 'slug' | 'thumbnail'>[], 
    planTier: number // Recebendo o Tier como parâmetro
): stripeLineItems[] => {
    
    // 1. Mapeia os produtos aplicando Desconto de 15% se for Tier 2
    const lineItems = data.map((product) => {
        // Lógica de Desconto Tier 2: Preço original * 0.85 (15% OFF)
        const finalPrice = planTier >= 2 
            ? Math.round(product.price * 0.85) 
            : product.price;

        return {
            price_data: {
                currency: 'brl',
                product_data: {
                    metadata: { id: product.id },
                    name: planTier >= 2 ? `${product.title} (15% OFF)` : product.title,
                    description: product.description,
                    images: [product.thumbnail],
                },
                unit_amount: finalPrice 
            },
            quantity: product.quantity
        }
    })

    // 2. Lógica de Entrega (Tier 1 ou superior ganha Frete Grátis)
    const shippingFee = planTier >= 1 ? 0 : 1500; // R$ 0,00 ou R$ 15,00

    const shippingItem: stripeLineItems = {
        price_data: {
            currency: 'brl',
            product_data: {
                name: planTier >= 1 ? 'Entrega Grátis (Membro Pro/Elite)' : 'Entrega Expressa',
                description: planTier >= 1 
                    ? 'Benefício exclusivo do seu plano ativo.' 
                    : 'Envio via transportadora com seguro e rastreio.',
            },
            unit_amount: shippingFee,
        },
        quantity: 1,
    }

    // 3. Taxa de Processamento Seguro (Mantida igual para todos)
    const serviceFeeItem: stripeLineItems = {
        price_data: {
            currency: 'brl',
            product_data: {
                name: 'Processamento Seguro',
                description: 'Criptografia de ponta a ponta e proteção ao comprador.',
            },
            unit_amount: 490, // R$ 4,90
        },
        quantity: 1,
    }

    // Retorna a lista completa: Produtos (com ou sem desconto) + Frete (grátis ou pago) + Taxa
    return [...lineItems, shippingItem, serviceFeeItem]
}

export const subscriptionDTO = (data: {id: string, name: string, price: number, description: string}): stripeLineItems[] => {
    const lineItems: stripeLineItems = {
        metadata: {plandId: data.id},
        price_data: {
            currency: 'brl',
            product_data: {
                name: data.name,
                description: data.description,
            },
            recurring: {
                interval: 'month'
            },
            unit_amount: data.price
        },
        quantity: 1
    } 
    return [lineItems]
}