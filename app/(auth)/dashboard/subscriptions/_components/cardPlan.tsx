import { LuCrown } from "react-icons/lu"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {planAction} from '../actions'

export const Plan = async () => {
    const userPlan = await planAction()

    return (
        <>
            <CardPlan  plan={userPlan}/>
        </>
    )
}

const CardPlan = ({plan}: {plan: {id: string, name: string, description: string, price: number, features: []}}) => {
    
    return (
                            <Card className="md:col-span-2 bg-zinc-950 border-zinc-800 overflow-hidden relative">
                                {/* Efeito de brilho sutil no topo para planos pagos */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                                
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                                    <div className="space-y-1">
                                        <CardTitle className="text-xl font-bold flex items-center gap-2">
                                            {plan.name}
                                            <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/10">
                                                Ativo
                                            </Badge>
                                        </CardTitle>
                                        <CardDescription className="text-zinc-500">
                                            {plan.description}
                                        </CardDescription>
                                    </div>
                                    <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-blue-500">
                                        <LuCrown size={24} />
                                    </div>
                                </CardHeader>
        
                                <CardContent className="space-y-6">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-black italic text-zinc-100">
                                            {(plan.price / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </span>
                                        <span className="text-zinc-600 text-xs font-bold uppercase tracking-widest">/ mês</span>
                                    </div>
        
                                    <div className="pt-4 border-t border-zinc-900">
                                        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">O que seu plano inclui:</p>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {plan.features.map(f => (
                                                <li key={f} className="text-xs text-zinc-400 flex items-center gap-2">
                                                    <div className="size-1.5 rounded-full bg-blue-500" />
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </CardContent>
        
                                <CardFooter className="bg-zinc-900/30 border-t border-zinc-800/50 py-4 flex justify-between items-center">
                                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tight">
                                        Próxima cobrança em: <span className="text-zinc-300">{'000'}</span>
                                    </p>
                                    <Button variant="ghost" className="text-xs font-bold text-blue-500 hover:text-blue-400 hover:bg-transparent">
                                        Ver Notas Fiscais
                                    </Button>
                                </CardFooter>
                            </Card>
    )
}

export const CardPlanSkeleton = () => {
    return (
        <Card className="md:col-span-2 bg-zinc-950 border-zinc-800 overflow-hidden relative">
            {/* Efeito de brilho estático para manter a identidade */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-zinc-800" />
            
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                <div className="space-y-2">
                    {/* Simula Título e Badge */}
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-7 w-32 bg-zinc-900" />
                        <Skeleton className="h-5 w-16 bg-zinc-900 rounded-full" />
                    </div>
                    {/* Simula Descrição */}
                    <Skeleton className="h-4 w-48 bg-zinc-900" />
                </div>
                {/* Simula o Ícone da Coroa */}
                <Skeleton className="size-12 bg-zinc-900 rounded-xl" />
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Simula o Preço */}
                <div className="flex items-baseline gap-2">
                    <Skeleton className="h-10 w-24 bg-zinc-900" />
                    <Skeleton className="h-4 w-12 bg-zinc-900" />
                </div>

                <div className="pt-4 border-t border-zinc-900">
                    {/* Simula Label "O que inclui" */}
                    <Skeleton className="h-3 w-32 bg-zinc-900 mb-4" />
                    
                    {/* Grid de Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center gap-2">
                                <Skeleton className="size-1.5 rounded-full bg-zinc-900" />
                                <Skeleton className="h-3 w-full max-w-[120px] bg-zinc-900" />
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>

            <CardFooter className="bg-zinc-900/30 border-t border-zinc-800/50 py-4 flex justify-between items-center">
                {/* Simula Data de Cobrança */}
                <Skeleton className="h-3 w-40 bg-zinc-900" />
                {/* Simula Botão de Notas Fiscais */}
                <Skeleton className="h-8 w-24 bg-zinc-900" />
            </CardFooter>
        </Card>
    )
}