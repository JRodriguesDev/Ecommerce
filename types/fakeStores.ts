export interface fakeStore {
    title: string
    description: string
    category: string
    image: string
    price: number
    rating: {rate: number, count: number}
}

export interface jsonDummy {
    limit: number
    products: [{title: string, rating: number, thumbnail: string, description: string, category: string, images: string[], price: number, stock: number}]
    skip: number
    total: number
}

export interface platzi {
    title: string
    description: string
    images: string[]
    price: number
    slug: string
    category: {slug: string}
}