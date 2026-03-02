import { LuCrown, LuTriangleAlert, LuCircleArrowUp, LuCircleX } from "react-icons/lu"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Suspense } from "react"
import {CardPlanSkeleton, Plan} from './_components/cardPlan'

const Subscriptions = () => {

    return (
        <div className="flex-1 flex justify-center py-10 px-4">
            <div className="w-full max-w-4xl space-y-8">
                
                {/* Header da Página */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">
                        Minha Assinatura
                    </h1>
                    <p className="text-zinc-500 text-sm">
                        Gerencie seu plano, faturamento e métodos de pagamento.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Card Principal do Plano Atual (Ocupa 2 colunas) */}
                    <Suspense fallback={<CardPlanSkeleton/>}>
                        <Plan/>
                    </Suspense>

                    {/* Coluna de Ações Rápidas */}
                    <div className="space-y-4">
                        <Card className="bg-zinc-950 border-zinc-800">
                            <CardHeader className="p-6">
                                <CardTitle className="text-sm font-bold uppercase tracking-widest">Ações</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 space-y-3">
                                <Button className="w-full justify-start gap-2 bg-zinc-100 text-black hover:bg-zinc-200 font-bold text-xs uppercase italic">
                                    <LuCircleArrowUp className="size-4" />
                                    Fazer Upgrade
                                </Button>
                                <Button variant="outline" className="w-full justify-start gap-2 border-zinc-800 text-zinc-400 hover:bg-zinc-900 font-bold text-xs uppercase">
                                    Trocar Cartão
                                </Button>
                                <div className="pt-4 mt-4 border-t border-zinc-900">
                                    <Button variant="ghost" className="w-full justify-start gap-2 text-red-500/70 hover:text-red-500 hover:bg-red-500/5 font-bold text-xs uppercase">
                                        <LuCircleX className="size-4" />
                                        Cancelar Plano
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-xl flex gap-3">
                            <LuTriangleAlert className="text-yellow-500 shrink-0" size={18} />
                            <p className="text-[10px] text-yellow-500/80 font-medium leading-tight">
                                Atenção: Ao cancelar seu plano, você perderá o acesso aos benefícios VIP imediatamente ao final do ciclo.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Subscriptions