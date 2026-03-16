import { LuCrown, LuTriangleAlert, LuCircleArrowUp, LuCircleX } from "react-icons/lu"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Suspense } from "react"
import { CardPlanSkeleton, Plan } from './_components/cardPlan'
import { CancelButton } from './_components/cardInteractive'
import Link from "next/link"

const Subscriptions = () => {

    return (
        <div className="flex-1 flex justify-center py-10 px-4">
            <div className="w-full max-w-4xl space-y-8">

                {/* Header da Página */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">
                        My Signature
                    </h1>
                    <p className="text-zinc-500 text-sm">
                        Manage your plan, billing, and payment methods.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Card Principal do Plano Atual (Ocupa 2 colunas) */}
                    <Suspense fallback={<CardPlanSkeleton />}>
                        <Plan />
                    </Suspense>

                    {/* Coluna de Ações Rápidas */}
                    <div className="space-y-4">
                        <Card className="bg-zinc-950 border-zinc-800">
                            <CardHeader className="p-6">
                                <CardTitle className="text-sm font-bold uppercase tracking-widest">Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 space-y-3">
                                <Link href='/subscription'>
                                    <Button className="w-full justify-start gap-2 bg-zinc-100 text-black hover:bg-zinc-200 font-bold text-xs uppercase italic">
                                        <LuCircleArrowUp className="size-4" />
                                        Upgrade
                                    </Button>
                                </Link>
                                <div className="pt-4 mt-4 border-t border-zinc-900">
                                    <CancelButton />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-xl flex gap-3">
                            <LuTriangleAlert className="text-yellow-500 shrink-0" size={18} />
                            <p className="text-[10px] text-yellow-500/80 font-medium leading-tight">
                                Warning: By cancelling your plan, you will immediately lose access to VIP benefits.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Subscriptions