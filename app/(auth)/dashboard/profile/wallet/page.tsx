import { 
    LuShieldCheck, 
} from "react-icons/lu"
import { Suspense } from 'react'
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {PaymentList, CardListSkeleton} from './_components/cardList'


const WalletPage = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20 px-4">
            
            {/* HEADER DA PÁGINA */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-10">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="bg-zinc-900 text-zinc-400 border-zinc-800 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest">
                            Methods
                        </Badge>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-zinc-100 uppercase italic flex items-center gap-3">
                        Carteira
                    </h1>
                    <p className="text-zinc-500 text-sm font-medium">
                        Gerencie seus cartões salvos para um checkout mais rápido.
                    </p>
                </div>
            </div>

            <Separator className="bg-zinc-800/60" />

            {/* LISTA DE CARTÕES */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">
                        Cartões
                    </h3>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    <Suspense fallback={<CardListSkeleton/>}>
                        {/* Placeholder de visualização do componente que faremos */}
                        <PaymentList/>
                    </Suspense>
                </div>
            </div>

            {/* NOTA DE SEGURANÇA */}
            <div className="flex items-center justify-center gap-3 pt-10 opacity-30">
                <LuShieldCheck className="size-4" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">
                    Sua segurança é nossa prioridade via Stripe 256-bit AES
                </span>
            </div>
        </div>
    )
}

export default WalletPage