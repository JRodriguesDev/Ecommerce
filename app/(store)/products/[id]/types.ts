export interface GalleryProps {
    thumbnail: string
    images: string[]
    title: string
}

export interface PageProps {
    params: Promise<{ id: string }>
}