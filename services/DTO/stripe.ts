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
            // Mantemos o preço original do produto aqui
            unit_amount: product.price 
        },
        quantity: product.quantity
    }))

    // 2. Criamos o item de "Taxa de Processamento Seguro"
    // Simulando: R$ 2,50 fixos + 3% sobre o valor total (opcional)
    const serviceFeeItem: stripeLineItems = {
        price_data: {
            currency: 'brl',
            product_data: {
                name: 'Processamento Seguro',
                description: 'Criptografia de ponta a ponta e proteção ao comprador.',
                // Você pode até colocar um ícone de escudo aqui se tiver a URL
            },
            unit_amount: 490, // R$ 4,90 - Valor fixo profissional
        },
        quantity: 1,
    }

    // Retorna a lista de produtos com a taxa injetada no final
    return [...lineItems, serviceFeeItem]
}