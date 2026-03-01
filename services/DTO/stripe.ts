import 'server-only'
import { Product } from '@/types/product'
import type { Stripe } from 'stripe'

type stripeLineItems = Stripe.Checkout.SessionCreateParams.LineItem

export const productsModeDTO = (
    data: Pick<Product, 'id' | 'title' | 'price' | 'quantity' | 'description' | 'rating' | 'stock' | 'slug' | 'thumbnail'>[]
): stripeLineItems[] => {
    
    // 1. Mapeia os produtos originais
    const lineItems = data.map((product) => ({
        price_data: {
            currency: 'brl',
            product_data: {
                metadata: { id: product.id },
                name: product.title,
                description: product.description,
                images: [product.thumbnail],
            },
            unit_amount: product.price 
        },
        quantity: product.quantity
    }))

    // 2. Item de Entrega (Frete Fixo)
    const shippingItem: stripeLineItems = {
        price_data: {
            currency: 'brl',
            product_data: {
                name: 'Entrega Expressa',
                description: 'Envio via transportadora com seguro e rastreio.',
                // Opcional: Você pode colocar uma imagem de um caminhão de entrega aqui
            },
            unit_amount: 1500, // R$ 15,00 - Valor fixo de entrega
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
            unit_amount: 490, // R$ 4,90
        },
        quantity: 1,
    }

    // Retorna a lista completa: Produtos + Frete + Taxa
    return [...lineItems, shippingItem, serviceFeeItem]
}