import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {planAction} from '../actions'
import { LuCrown, LuCreditCard, LuMail } from "react-icons/lu";
import Link from "next/link"
import {ToggleChargeButton} from './cardInteractive'

export const Plan = async () => {
    const userPlan = await planAction()
    
    if (!userPlan || !userPlan.id) {
        return <EmptyPlan />
    }

    return (
        <>
            <CardPlan  plan={userPlan}/>
        </>
    )
}
// ... outros imports (Button, Card, etc)

const CardPlan = ({ plan }: { 
    plan: { 
        id: string, 
        name: string, 
        description: string, 
        price: number, 
        features: string[], 
        nextBillingDate: Date, 
        billingMethod: string 
    } 
}) => {
    const isAuto = plan.billingMethod === 'charge_automatically';

    return (
        <Card className="md:col-span-2 bg-zinc-950 border-zinc-800 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                <div className="space-y-1">
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                        {plan.name}
                        <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">
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
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black italic text-zinc-100">
                            {(plan.price / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                        <span className="text-zinc-600 text-xs font-bold uppercase tracking-widest">/ mês</span>
                    </div>

                    {/* SEÇÃO DE MÉTODO DE PAGAMENTO */}
                    <div className={`flex items-center gap-3 p-3 rounded-lg border ${isAuto ? 'border-emerald-500/10 bg-emerald-500/5' : 'border-amber-500/10 bg-amber-500/5'}`}>
                        <div className={isAuto ? 'text-emerald-500' : 'text-amber-500'}>
                            {isAuto ? <LuCreditCard size={20} /> : <LuMail size={20} />}
                        </div>
                        <div className="flex flex-col">
                            <p className="text-[10px] font-bold uppercase tracking-tight text-zinc-300">
                                {isAuto ? 'Cobrança Automática' : 'Fatura Manual'}
                            </p>
                            <p className="text-[11px] text-zinc-500 leading-tight">
                                {isAuto ? 'Cobrado no cartão salvo' : 'Pagamento manual'}
                            </p>
                        </div>
                        <ToggleChargeButton/>
                    </div>
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
                    Próxima cobrança em: <span className="text-zinc-300">{plan.nextBillingDate.toLocaleDateString('pt-BR')}</span>
                </p>
                <Button variant="ghost" className="text-xs font-bold text-blue-500 hover:text-blue-400 hover:bg-transparent">
                    Ver Notas Fiscais
                </Button>
            </CardFooter>
        </Card>
    );
}

export const EmptyPlan = () => {
    return (
        /* Adicionei md:col-span-2 para alinhar com o tamanho do seu card original */
        <div className="md:col-span-2 flex flex-col items-center justify-center min-h-[450px] w-full border-2 border-dashed border-zinc-800/50 rounded-[2rem] bg-zinc-900/10 backdrop-blur-sm px-4 text-center">
            
            <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full" />
                <div className="relative bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-2xl">
                    <LuCrown className="size-10 text-zinc-700" />
                </div>
            </div>

            <div className="space-y-2 max-w-sm"> {/* Aumentei de max-w-xs para max-w-sm para o texto espalhar mais */}
                <h2 className="text-zinc-100 font-black uppercase italic text-2xl tracking-tighter">
                    Nenhum Plano Ativo
                </h2>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                    Você ainda não possui uma assinatura ativa. Escolha um plano para desbloquear recursos exclusivos e elevar sua experiência para o próximo nível.
                </p>
            </div>

            <Button 
                asChild
                className="mt-10 bg-zinc-100 text-black hover:bg-white transition-all gap-2 px-12 h-14 rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-xl shadow-white/5"
            >
                <Link href="/subscription">
                    Explorar Nossos Planos
                </Link>
            </Button>
        </div>
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