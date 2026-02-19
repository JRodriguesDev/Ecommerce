export interface FavoriteCardProps {
    id: string;
    thumbnail: string;
    rating: number;
    slug: string;
    title: string;
    price: number;
    stock: number;
    onRemove?: (id: string) => void; // Para a função do botão de lixeira
}
