import { Card, CardContent } from "@/components/ui/card"
import { OrderCard } from './orderCardInteractive'
import { Skeleton } from "@/components/ui/skeleton"
import { ShoppingBag, ArrowRight } from "lucide-react"
import Link from "next/link"
import { allOrdersAction } from '../actions'

export const OrderList = async () => {

    // Busca real no banco
    const orders = await allOrdersAction()

    if (orders.length === 0) {
        return <EmptyOrders />
    }

    return (
        <div className="grid grid-cols-1 gap-3">
            {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
            ))}
        </div>
    )
}

export const OrderCardSkeleton = () => {
    return (
        <>
            {[...Array(4)].map((_, i) => (
                <Card key={i} className="bg-zinc-950 border-zinc-800/60 overflow-hidden relative">
                    <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between p-5 gap-6">

                            <div className="flex items-center gap-5">
                                {/* Skeleton da Imagem Principal */}
                                <Skeleton className="size-16 shrink-0 rounded-xl bg-zinc-900" />

                                <div className="space-y-2.5">
                                    <div className="flex items-center gap-3">
                                        {/* ID do Pedido */}
                                        <Skeleton className="h-3 w-16 bg-zinc-900" />
                                        <span className="text-zinc-800 text-[10px]">•</span>
                                        {/* Data */}
                                        <Skeleton className="h-3 w-20 bg-zinc-900" />
                                        {/* Badge de Status */}
                                        <Skeleton className="h-4 w-12 rounded-full bg-zinc-900" />
                                    </div>

                                    {/* Título do Pedido */}
                                    <Skeleton className="h-4 w-48 bg-zinc-800" />

                                    <div className="flex items-center gap-4">
                                        {/* Preço Total */}
                                        <Skeleton className="h-4 w-24 bg-zinc-900" />
                                        {/* Ícone de Pagamento */}
                                        <div className="flex items-center gap-1.5">
                                            <Skeleton className="size-3 rounded-full bg-zinc-900" />
                                            <Skeleton className="h-3 w-16 bg-zinc-900" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {/* Avatar Stack Skeleton */}
                                <div className="flex -space-x-3">
                                    <Skeleton className="size-8 rounded-full border-2 border-zinc-950 bg-zinc-900" />
                                    <Skeleton className="size-8 rounded-full border-2 border-zinc-950 bg-zinc-900" />
                                    <Skeleton className="size-8 rounded-full border-2 border-zinc-950 bg-zinc-900" />
                                </div>

                                {/* Botão de Detalhes */}
                                <Skeleton className="h-10 w-28 rounded-xl bg-zinc-900" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </>
    )
}

export const EmptyOrders = () => (
    <div className="flex flex-col items-center justify-center py-20 px-6 border-2 border-dashed border-zinc-800 rounded-3xl bg-zinc-900/10">
        <div className="size-16 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-6">
            <ShoppingBag className="size-8 text-zinc-500" />
        </div>
        <h3 className="text-xl font-bold text-zinc-200 mb-2">Nenhum pedido encontrado</h3>
        <p className="text-zinc-500 text-sm text-center max-w-xs mb-8">
            Parece que você ainda não realizou nenhuma compra em nossa loja.
        </p>
        <Link
            href="/shop"
            className="flex items-center gap-2 px-6 py-3 bg-zinc-100 hover:bg-white text-black rounded-xl font-bold transition-all"
        >
            Ir para a Loja
            <ArrowRight className="size-4" />
        </Link>
    </div>
)
