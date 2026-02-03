import { LuHeart, LuTrash2, LuShoppingCart, LuSearch, LuPlus } from "react-icons/lu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

const Favorites = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20 px-4">
            
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-zinc-100 uppercase italic flex items-center gap-3">
                        Favoritos <LuHeart className="fill-red-500 text-red-500 size-6" />
                    </h1>
                    <p className="text-zinc-500 text-sm font-medium">Itens que você salvou para comprar depois.</p>
                </div>

                <div className="relative w-full md:w-72">
                    <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-600" />
                    <Input 
                        placeholder="Filtrar favoritos..." 
                        className="bg-zinc-900/40 border-zinc-800 pl-10 text-xs h-11 focus-visible:ring-zinc-700"
                    />
                </div>
            </div>

            {/* GRID DE PRODUTOS FAVORITADOS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                
                <FavoriteCard 
                    title="Setup Gamer Full Black"
                    price="R$ 12.490,00"
                    image="https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=300&h=300&fit=crop"
                />

                <FavoriteCard 
                    title="Headset Wireless Pro"
                    price="R$ 1.200,00"
                    image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop"
                />

                <FavoriteCard 
                    title="Mouse Pad Control Extra Large"
                    price="R$ 150,00"
                    image="https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300&h=300&fit=crop"
                />

                <FavoriteCard 
                    title="Webcam 4K Streaming"
                    price="R$ 890,00"
                    image="https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=300&h=300&fit=crop"
                />

            </div>
        </div>
    )
}

// COMPONENTE DE CARD DE FAVORITO
const FavoriteCard = ({ title, price, image }: any) => {
    return (
        <Card className="bg-zinc-900/20 border-zinc-800 hover:border-zinc-700 transition-all group overflow-hidden flex flex-col">
            {/* ÁREA DA IMAGEM */}
            <div className="relative aspect-square overflow-hidden bg-zinc-800">
                <img 
                    src={image} 
                    alt={title} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" 
                />
                
                {/* BOTÃO REMOVER (Aparece no hover) */}
                <button className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-md rounded-lg text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                    <LuTrash2 className="size-4" />
                </button>
            </div>

            <CardContent className="p-4 flex-1 space-y-2">
                <h3 className="text-sm font-bold text-zinc-200 line-clamp-2 leading-snug group-hover:text-white transition-colors">
                    {title}
                </h3>
                <p className="text-lg font-black text-zinc-100 italic">{price}</p>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Button className="w-full bg-zinc-100 hover:bg-white text-black font-black text-[10px] uppercase tracking-tighter gap-2 h-10">
                    <LuShoppingCart className="size-4" />
                    Adicionar ao Carrinho
                </Button>
            </CardFooter>
        </Card>
    )
}

export default Favorites