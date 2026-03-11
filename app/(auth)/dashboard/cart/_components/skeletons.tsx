import { Card, CardContent } from "@/components/ui/card"

export const SummarySkeleton = () => {
    return (
        <aside className="w-full xl:w-80 shrink-0 sticky top-8">
            <Card className="bg-zinc-900/10 border-zinc-800/40 backdrop-blur-md overflow-hidden rounded-2xl">
                <div className="p-5 space-y-6 animate-pulse">
                    {/* Título: Resumo do Pedido */}
                    <div className="h-3 w-28 bg-zinc-800 rounded" />

                    {/* LISTA DE ITENS SKELETON */}
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex justify-between items-start gap-4">
                                <div className="flex-1 space-y-2">
                                    {/* Nome do produto */}
                                    <div className="h-2 w-full bg-zinc-800/60 rounded" />
                                    {/* Qtd x Preço */}
                                    <div className="h-2 w-16 bg-zinc-800/30 rounded" />
                                </div>
                                {/* Subtotal da linha */}
                                <div className="h-3 w-14 bg-zinc-800/40 rounded mt-1" />
                            </div>
                        ))}
                    </div>

                    <div className="h-px bg-zinc-800/50" />

                    {/* TOTAIS SKELETON */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <div className="h-2 w-12 bg-zinc-800/50 rounded" />
                            <div className="h-3 w-20 bg-zinc-800 rounded" />
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="h-2 w-10 bg-zinc-800/50 rounded" />
                            <div className="h-3 w-14 bg-zinc-800/30 rounded" />
                        </div>

                        <div className="h-px bg-zinc-800/50 my-2" />

                        <div className="flex justify-between items-end pt-1">
                            <div className="h-3 w-10 bg-zinc-800/50 rounded" />
                            <div className="h-7 w-32 bg-zinc-800 rounded" />
                        </div>
                    </div>

                    {/* Botão de Checkout Skeleton */}
                    <div className="w-full h-[52px] bg-zinc-800/50 rounded-xl" />
                </div>
            </Card>
        </aside>
    )
}

export const CartItemSkeleton = () => {
    return (
        <>
            {
                [...Array(4)].map((_, i) => (
                    <Card key={i} className="bg-zinc-900/10 border-zinc-800/40 overflow-hidden rounded-xl">
                        <CardContent className="p-0">
                            {/* Altura ajustada para h-28 para casar com o novo Card */}
                            <div className="flex items-stretch h-28 animate-pulse">

                                {/* MINIATURA LATERAL SKELETON (w-28) */}
                                <div className="w-28 shrink-0 bg-zinc-800/40 border-r border-zinc-800/30" />

                                {/* CONTEÚDO SKELETON */}
                                <div className="flex-1 px-4 py-3 flex items-center justify-between gap-4">

                                    <div className="space-y-2">
                                        {/* Top row: ID e Rating */}
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-10 bg-zinc-800 rounded" />
                                            <div className="h-3 w-6 bg-zinc-800/60 rounded" />
                                        </div>

                                        {/* Title line */}
                                        <div className="h-4 w-40 bg-zinc-800 rounded" />

                                        {/* Bottom row: Price e Stock */}
                                        <div className="flex items-center gap-3">
                                            <div className="h-4 w-16 bg-zinc-800/80 rounded" />
                                            <div className="h-3 w-12 bg-zinc-800/40 rounded" />
                                        </div>
                                    </div>

                                    {/* AÇÕES SKELETON */}
                                    <div className="flex items-center gap-3">
                                        {/* CONTROLES (Stepper) - h-9 para combinar com o novo design */}
                                        <div className="h-9 w-20 bg-zinc-800/30 border border-zinc-800/40 rounded-lg" />

                                        {/* TRASH ICON */}
                                        <div className="size-9 bg-zinc-800/30 rounded-lg flex items-center justify-center">
                                            <div className="size-4 bg-zinc-800 rounded" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))
            }
        </>
    )
}