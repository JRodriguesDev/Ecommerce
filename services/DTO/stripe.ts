import 'server-only'

import {Product} from '@/types/product'
import type {Stripe} from 'stripe'

type stripeLineItems = Stripe.Checkout.SessionCreateParams.LineItem

export const productsModeDTO = (data: Pick<Product, 'id' | 'title' | 'price' | 'quantity' | 'description' | 'rating' | 'stock' | 'slug' | 'thumbnail'>[]): stripeLineItems[] => {
    return data.map((product) => ({
        price_data: {
            currency: 'brl',
            product_data: {
                metadata: {id: product.id},
                name: product.title,
                description: product.description,
                images: [product.thumbnail],
            },
            unit_amount: product.price
        },
        quantity: product.quantity
    }))
} 