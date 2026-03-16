import { LuShoppingBag } from "react-icons/lu"
import { Suspense } from "react";
import { Cards, SummaryPrices } from './_components/itemsList'
import { CartItemSkeleton, SummarySkeleton } from './_components/skeletons'

const Cart = () => {
    return (
        /** * AJUSTES DE LARGURA:
         * pl-72: Recuo para a Sidebar (ajuste se sua sidebar for maior/menor).
         * max-w-5xl: Diminuí a largura total para o layout ficar mais "slim" e elegante.
         */
        <div className="max-w-5xl mx-auto space-y-6 pb-20 px-4 pl-10 lg:pl-72 pt-8">

            {/* HEADER DA PÁGINA */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black tracking-tighter text-zinc-100 uppercase italic flex items-center gap-2">
                        Cart <LuShoppingBag className="size-5 text-zinc-600" />
                    </h1>
                </div>
            </div>

            {/* CONTEÚDO PRINCIPAL EM FLEX-COL (Layout mais estreito) */}
            <div className="flex flex-col xl:flex-row gap-6 items-start">

                {/* LISTA DE PRODUTOS */}
                <div className="flex-1 grid grid-cols-1 gap-2 w-full">
                    <Suspense fallback={<CartItemSkeleton />}>
                        <Cards />
                    </Suspense>
                </div>
                <Suspense fallback={<SummarySkeleton />}>
                    <SummaryPrices />
                </Suspense>
            </div>
        </div>
    )
}


export default Cart;