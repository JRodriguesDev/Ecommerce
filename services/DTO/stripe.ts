import 'server-only'
import { Product } from '@/types/product'
import type { Stripe } from 'stripe'

type stripeLineItems = Stripe.Checkout.SessionCreateParams.LineItem

export const productsModeDTO = (
    data: Pick<Product, 'id' | 'title' | 'price' | 'quantity' | 'description' | 'rating' | 'stock' | 'slug' | 'thumbnail'>[],
    planTier: number,
    planStatus: string
): stripeLineItems[] => {

    // 0. Validação de Benefícios: Só aplica se for ACTIVE ou TRIALING
    // Se for 'past_due', 'canceled' ou 'unpaid', isBenefitEligible será false.
    const isBenefitEligible = planStatus === 'active' || planStatus === 'trialing';

    // 1. Mapeia os produtos aplicando Desconto
    const lineItems = data.map((product) => {
        // Só aplica o desconto de 15% se for Tier 2 E estiver com pagamento em dia
        const applyDiscount = isBenefitEligible && planTier >= 2;

        const finalPrice = applyDiscount
            ? Math.round(product.price * 0.85)
            : product.price;

        return {
            price_data: {
                currency: 'brl',
                product_data: {
                    metadata: { id: product.id },
                    name: applyDiscount ? `${product.title} (15% OFF)` : product.title,
                    description: product.description,
                    images: [product.thumbnail],
                },
                unit_amount: finalPrice
            },
            quantity: product.quantity
        }
    })

    // 2. Lógica de Entrega (Tier 1+ e elegível ganha Frete Grátis)
    const hasFreeShipping = isBenefitEligible && planTier >= 1;
    const shippingFee = hasFreeShipping ? 0 : 1500;

    const shippingItem: stripeLineItems = {
        price_data: {
            currency: 'brl',
            product_data: {
                name: hasFreeShipping ? 'Entrega Grátis (Membro Pro/Elite)' : 'Entrega Expressa',
                description: hasFreeShipping
                    ? 'Benefício exclusivo do seu plano ativo.'
                    : isBenefitEligible === false && planTier >= 1
                        ? 'Frete grátis suspenso por pendência no pagamento.'
                        : 'Envio via transportadora com seguro e rastreio.',
            },
            unit_amount: shippingFee,
        },
        quantity: 1,
    }

    // 3. Taxa de Processamento Seguro
    const serviceFeeItem: stripeLineItems = {
        price_data: {
            currency: 'brl',
            product_data: {
                name: 'Processamento Seguro',
                description: 'Criptografia de ponta a ponta e proteção ao comprador.',
            },
            unit_amount: 490,
        },
        quantity: 1,
    }

    return [...lineItems, shippingItem, serviceFeeItem]
}

export const subscriptionDTO = (data: { id: string, name: string, price: number, description: string }): stripeLineItems[] => {
    const lineItems: stripeLineItems = {
        metadata: { plandId: data.id },
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