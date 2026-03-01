import * as LuIcons from "react-icons/lu"
import { LuCheck } from "react-icons/lu"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {allPlansAction} from '../actions'

// Tipagem baseada no que vem do Prisma
interface PlanProps {
    plan: {
        id: string
        name: string
        price: number
        description: string | null
        features: string[] // Se estiver usando Postgres/Mongo
        icon: string
    }
}

export const PlanList = async () => {
    const plans = await allPlansAction()
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map(el => (
                    <PlanCard key={el.id} plan={el} />
                ))}
            </div>
        </>
    )
}

const PlanCard = ({ plan }: PlanProps) => {
    // Lógica para renderizar o ícone dinamicamente pelo nome vindo da Seed
    const IconComponent = (LuIcons as any)[plan.icon] || LuIcons.LuStar

    // Lógica de estilos baseada no nome ou ID do plano
    const isPro = plan.name.includes("Pro")
    const isElite = plan.name.includes("Elite")

    return (
        <Card
            key={plan.id}
            className={`bg-zinc-950 border-zinc-800/60 relative overflow-hidden transition-all duration-500 hover:scale-[1.02] 
                ${isPro ? 'border-blue-500/50 shadow-2xl shadow-blue-500/10' : ''} 
                ${isElite ? 'border-yellow-500/50 shadow-yellow-500/5' : ''}`}
        >
            <CardHeader className="space-y-4 pt-8">
                <div className={`p-3 bg-zinc-900 w-fit rounded-2xl border border-zinc-800 
                    ${isPro ? 'text-blue-500' : isElite ? 'text-yellow-500' : 'text-zinc-500'}`}>
                    <IconComponent className="size-5" />
                </div>
                <div className="space-y-1">
                    <CardTitle className="text-2xl font-black uppercase italic tracking-tighter">
                        {plan.name}
                    </CardTitle>
                    <p className="text-zinc-500 text-xs font-medium leading-relaxed">
                        {plan.description}
                    </p>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black tracking-tighter text-zinc-100 italic">
                        {(plan.price / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                    <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">/ mês</span>
                </div>

                <div className="space-y-3">
                    {plan.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-3 group">
                            <div className="size-5 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:border-zinc-500 transition-colors">
                                <LuCheck className="size-3 text-zinc-400 group-hover:text-white" />
                            </div>
                            <span className="text-xs font-bold text-zinc-400 group-hover:text-zinc-200">
                                {feature}
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>

            <CardFooter className="pb-8">
                <button className={`w-full h-12 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                    isPro 
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20' 
                    : isElite
                    ? 'bg-yellow-500 hover:bg-yellow-400 text-black'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400'
                }`}>
                    {plan.price === 0 ? "Plano Atual" : "Fazer Upgrade"}
                </button>
            </CardFooter>
        </Card>
    )
}

export const PlanSkeleton = () => {
    return (
        /* Adicionamos w-full e max-w-6xl para garantir que ele expanda */
        <div className="w-full max-w-6xl mx-auto"> 
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="bg-zinc-950 border-zinc-800/60 relative overflow-hidden flex flex-col min-h-[550px]">
                        <CardHeader className="space-y-6 pt-10 px-8">
                            {/* Skeleton do Ícone - Levemente maior */}
                            <Skeleton className="size-14 rounded-2xl bg-zinc-900" />
                            
                            <div className="space-y-3">
                                {/* Skeleton do Título do Plano */}
                                <Skeleton className="h-9 w-40 bg-zinc-900" />
                                
                                {/* Skeleton da Descrição */}
                                <div className="space-y-2">
                                    <Skeleton className="h-3 w-full bg-zinc-900/50" />
                                    <Skeleton className="h-3 w-5/6 bg-zinc-900/50" />
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-8 px-8 flex-1">
                            {/* Skeleton do Preço */}
                            <div className="flex items-baseline gap-2 py-4">
                                <Skeleton className="h-12 w-32 bg-zinc-900" />
                                <Skeleton className="h-4 w-12 bg-zinc-900/50" />
                            </div>

                            {/* Skeleton das Features - Com mais espaçamento */}
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map((f) => (
                                    <div key={f} className="flex items-center gap-4">
                                        <Skeleton className="size-6 rounded-full bg-zinc-900" />
                                        <Skeleton className="h-3 flex-1 bg-zinc-900/30" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>

                        <CardFooter className="pb-10 px-8">
                            {/* Skeleton do Botão - Mais robusto */}
                            <Skeleton className="h-14 w-full rounded-2xl bg-zinc-900 shadow-inner" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}