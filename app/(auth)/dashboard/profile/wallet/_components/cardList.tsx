import { 
    LuCreditCard, 
    LuMoveHorizontal,
    LuInfo,
} from "react-icons/lu"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {RemoveCardButton} from './buttonInterative'
import {allPaymentMethodsAction} from '../actions'

export const PaymentList = async () => {
    const cardList = await allPaymentMethodsAction()
    if (cardList.length <= 0) return <EmptyList/>
    return (
        <>
            {cardList.map(el => (
                <CardPayment
                    key={el.id}
                    id={el.id}
                    last4={el.last4}
                    brand={el.brand}
                    exp_month={el.exp_month!}
                    exp_year={el.exp_year!}
                    funding={el.funding!}
                />
            ))}
        </>
    )
}

const CardPayment = ({id, last4, brand, exp_month, exp_year, funding} : {id: string, last4: string, brand: string, exp_month: number, exp_year: number, funding: string}) => {
    return (
        <div className="space-y-3">
                            {/* Exemplo de como o componente se comportará com os atributos citados */}
                            <Card className="bg-zinc-900/20 border-zinc-800/60 hover:border-zinc-700 transition-all group overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="flex items-center justify-between p-4">
                                        <div className="flex items-center gap-4">
                                            {/* ÍCONE DA BANDEIRA (BRAND) */}
                                            <div className="size-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center">
                                                <LuCreditCard className="size-6 text-zinc-400 group-hover:text-white transition-colors" />
                                            </div>
                                            
                                            <div className="space-y-0.5">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-bold text-zinc-200 uppercase tracking-tight">
                                                        •••• •••• •••• {last4} {/* last4 */}
                                                    </p>
                                                    <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[8px] font-black px-1.5 h-4 uppercase">
                                                        Padrão
                                                    </Badge>
                                                </div>
                                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">
                                                    {brand} • Expira em {exp_month}/{exp_year} {/* brand, exp_month/year */}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="hidden md:block text-right">
                                                <p className="text-[10px] font-black text-zinc-600 uppercase">Tipo</p>
                                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{funding}</p> {/* funding */}
                                            </div>
                                            
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="size-9 p-0 hover:bg-zinc-800 rounded-lg">
                                                        <LuMoveHorizontal className="size-4 text-zinc-500" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-zinc-950 border-zinc-800 text-zinc-400">
                                                    <RemoveCardButton id={id}/>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
    )
}

const EmptyList = () => {
    return (
        <div className="flex flex-col items-center justify-center py-24 rounded-[2.5rem] bg-zinc-950/50 border-2 border-dashed border-zinc-900 shadow-inner">
                             <div className="relative mb-6">
                                <LuCreditCard className="size-16 text-zinc-900" />
                                <LuInfo className="size-5 text-zinc-700 absolute -top-1 -right-1" />
                             </div>
                             <h4 className="text-zinc-400 font-bold text-sm">Nenhum cartão cadastrado</h4>
                             <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest mt-1">Adicione um método para compras rápidas</p>
                        </div>
    )
}

export const CardListSkeleton = () => {
    // Renderiza 3 skeletons para simular uma lista carregando
    return (
        <div className="space-y-3">
            {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-zinc-900/20 border-zinc-800/60 overflow-hidden">
                    <CardContent className="p-0">
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-4">
                                {/* Skeleton do Ícone da Bandeira */}
                                <Skeleton className="size-12 rounded-xl bg-zinc-800/50" />
                                
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        {/* Skeleton dos Números do Cartão */}
                                        <Skeleton className="h-4 w-32 bg-zinc-800/50" />
                                        {/* Skeleton do Badge Padrão */}
                                        <Skeleton className="h-4 w-12 rounded-md bg-zinc-800/30" />
                                    </div>
                                    {/* Skeleton da Brand e Expiração */}
                                    <Skeleton className="h-3 w-24 bg-zinc-800/30" />
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="hidden md:flex flex-col items-end gap-1">
                                    {/* Skeleton do Label 'Tipo' */}
                                    <Skeleton className="h-2 w-8 bg-zinc-800/30" />
                                    {/* Skeleton do Valor 'Credit' */}
                                    <Skeleton className="h-3 w-12 bg-zinc-800/50" />
                                </div>
                                
                                {/* Skeleton do Botão de Menu */}
                                <Skeleton className="size-9 rounded-lg bg-zinc-800/50" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}