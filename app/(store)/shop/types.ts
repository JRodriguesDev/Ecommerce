import { Product } from '@/types/product'

export type ProductCarouselItem = Pick<Product, 'id' | 'title' | 'price' | 'thumbnail' | 'rating' | 'slug'> // Exemplo de campos

export interface CarouselProps {
    products: ProductCarouselItem[]
}