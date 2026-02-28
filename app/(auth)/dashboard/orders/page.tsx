import { OrderList, OrderCardSkeleton} from './_components/orderCard'
import { Suspense } from 'react'

const Shopping = () => {
    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-20 px-4">
            
            {/* HEADER DA PÁGINA */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-zinc-100 uppercase italic">Meus Pedidos</h1>
                    <p className="text-zinc-500 text-sm font-medium">Histórico de compras e acessos.</p>
                </div>
            </div>

            {/* LISTA DE PEDIDOS */}
            <div className="grid grid-cols-1 gap-3">
                <Suspense fallback={<OrderCardSkeleton/>}>
                    <OrderList />
                </Suspense>
            </div>
        </div>
    )
}

export default Shopping