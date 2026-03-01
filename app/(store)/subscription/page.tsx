import { LuZap, LuPercent} from "react-icons/lu"
import { Suspense } from "react"
import { Badge } from "@/components/ui/badge"
import {PlanList, PlanSkeleton} from './_components/plan'

const Subscription = () => {
    return (
        <div className="max-w-6xl mx-auto py-20 px-4 space-y-16">
            
            {/* TEXTO DE INTRODUÇÃO */}
            <div className="text-center space-y-4">
                <Badge variant="outline" className="border-blue-500/30 text-blue-500 bg-blue-500/5 uppercase font-black px-4 py-1 italic tracking-widest">
                    Upgrade Your Experience
                </Badge>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-100 uppercase italic">
                    Escolha seu <span className="text-blue-500">PLANO</span>
                </h1>
                <p className="text-zinc-500 max-w-xl mx-auto font-medium">
                    Desbloqueie benefícios exclusivos, economize no frete e tenha descontos que se pagam sozinhos em cada compra.
                </p>
            </div>

            {/* GRID DE PLANOS */}
                <Suspense fallback={<PlanSkeleton/>}>
                    <PlanList/>
                </Suspense>

            {/* INFO EXTRA */}
            <div className="bg-zinc-900/30 border border-zinc-800/60 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
                <div className="flex items-center gap-4 text-center md:text-left">
                    <div className="size-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                        <LuZap className="size-6 text-blue-500" />
                    </div>
                    <div>
                        <h4 className="text-sm font-black text-zinc-100 uppercase">Mudança Instantânea</h4>
                        <p className="text-xs text-zinc-500 font-medium">Você pode fazer o upgrade ou cancelar sua assinatura a qualquer momento.</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 opacity-50">
                    <LuPercent className="size-4" />
                    <span className="text-[10px] font-black uppercase">Taxas inclusas</span>
                </div>
            </div>
        </div>
    )
}

export default Subscription