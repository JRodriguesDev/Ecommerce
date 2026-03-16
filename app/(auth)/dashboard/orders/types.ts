import {Product} from '@/types/product'

export interface Order {
    id: string,
    status: string,
    stripeSessionId: string,
    totalAmount: number,
    products: Product[],
    createdAt: Date
}