import { LuDownload, LuCircleCheck, LuClock, LuReceipt } from "react-icons/lu";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"; 
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {listInvoicesAction} from '../actions'

export const InvoiceCardList = async () => {
    const invoices = await listInvoicesAction()
    if (invoices.length == 0) return <EmptyInvoice/>
    return (
        <div className="grid gap-3">
            {invoices.map(el => (
                <InvoiceCard key={el.id} invoice={el}/>
            ))}
        </div>
    )
}

const InvoiceCard = ({ invoice }: { 
    invoice: { 
        id: string, 
        status: string, 
        date: string, 
        displayAmount: string, 
        hosted_invoice_url: string,
        pdfUrl: string,
    } 
}) => {
    const isPaid = invoice.status === 'paid';

    return (
        <div 
            key={invoice.id} 
            className="group flex items-center justify-between p-5 rounded-2xl bg-zinc-950 border border-zinc-900 hover:border-zinc-700 transition-all duration-300"
        >
            <div className="flex items-center gap-5">
                {/* Indicador visual de Status */}
                <div className={`relative flex items-center justify-center size-12 rounded-xl border ${
                    isPaid 
                    ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500' 
                    : 'bg-amber-500/5 border-amber-500/20 text-amber-500'
                }`}>
                    {isPaid ? <LuCircleCheck size={22} /> : <LuClock size={22} />}
                    {!isPaid && (
                        <span className="absolute -top-1 -right-1 size-3 bg-amber-500 rounded-full animate-pulse border-2 border-zinc-950" />
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">
                        Payment of {invoice.date}
                    </span>
                    <div className="flex items-center gap-2">
                        <code className="text-[10px] text-zinc-600 font-mono bg-zinc-900 px-1.5 py-0.5 rounded">
                            {invoice.id}
                        </code>
                        <Badge variant="outline" className={`text-[9px] px-2 py-0 h-4 uppercase font-black tracking-tighter ${
                            isPaid 
                            ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' 
                            : 'text-amber-500 border-amber-500/20 bg-amber-500/5'
                        }`}>
                            {isPaid ? 'Confirmed' : 'Waiting'}
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="text-right">
                    <p className="text-lg font-black text-zinc-100 italic">
                        {invoice.displayAmount}
                    </p>
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">BRL</p>
                </div>
                
                <div className="flex items-center gap-2">
                    {/* BOTÃO CONDICIONAL: PAGAR OU PDF */}
                    {!isPaid ? (
                        <Button 
                            asChild
                            size="sm" 
                            className="bg-amber-500 hover:bg-amber-600 text-black font-black text-[10px] uppercase tracking-widest px-4 h-9 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                        >
                            <Link href={invoice.hosted_invoice_url || ''}>
                                Pay Now
                            </Link>
                        </Button>
                    ) : (
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all gap-2 h-9 text-[10px] font-bold uppercase tracking-widest"
                            asChild
                        >
                            <a href={invoice.pdfUrl} target="_blank" rel="noreferrer">
                                <LuDownload size={14} />
                                PDF
                            </a>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export const InvoiceCardSkeleton = () => {
    return (
        <>
        <div className="grid gap-3">
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-zinc-950 border border-zinc-900">
                    <div className="flex items-center gap-5">
                        {/* Skeleton do Ícone de Status */}
                        <Skeleton className="size-12 rounded-xl bg-zinc-900" />

                        <div className="flex flex-col gap-2">
                            {/* Skeleton da Data */}
                            <Skeleton className="h-4 w-32 bg-zinc-900" />
                            
                            <div className="flex items-center gap-2">
                                {/* Skeleton do ID/Código */}
                                <Skeleton className="h-3 w-20 bg-zinc-900 rounded" />
                                {/* Skeleton da Badge */}
                                <Skeleton className="h-4 w-16 bg-zinc-900 rounded-full" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex flex-col items-end gap-1">
                            {/* Skeleton do Valor */}
                            <Skeleton className="h-6 w-20 bg-zinc-900" />
                            {/* Skeleton da Moeda (BRL) */}
                            <Skeleton className="h-3 w-8 bg-zinc-900" />
                        </div>
                        
                        {/* Skeleton do Botão PDF */}
                        <Skeleton className="h-9 w-20 bg-zinc-900 rounded-md" />
                    </div>
                </div>
            ))}
        </div>
        </>
    );
};

const EmptyInvoice = () => {

    return (
        <div className="flex flex-col items-center justify-center min-h-[450px] w-full border-2 border-dashed border-zinc-800/50 rounded-[2.5rem] bg-zinc-900/10 backdrop-blur-sm px-4 text-center">
            
            {/* ÍCONE COM GLOW AZUL (Combinando com o tema de faturamento) */}
            <div className="relative mb-6">
                {/* Glow Azul em vez de Vermelho */}
                <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
                
                <div className="relative bg-zinc-950 border border-zinc-800 p-6 rounded-3xl shadow-2xl">
                    {/* Ícone de Fatura Vazia */}
                    <LuReceipt className="size-10 text-zinc-700" />
                    {/* Pequeno badge de "X" ou "0" para reforçar o vazio */}
                    <div className="absolute -bottom-1 -right-1 bg-zinc-950 border border-zinc-800 size-6 rounded-lg flex items-center justify-center">
                        <span className="text-[10px] font-black text-zinc-500">0</span>
                    </div>
                </div>
            </div>

            {/* TEXTOS */}
            <div className="space-y-2 max-w-xs">
                <h2 className="text-zinc-100 font-black uppercase italic text-xl tracking-tighter">
                    Sem histórico de faturas
                </h2>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed italic">
                    Parece que você ainda não realizou transações. Suas notas fiscais e recibos aparecerão aqui assim que você assinar um plano.
                </p>
            </div>

            {/* BOTÃO DE AÇÃO (CTA) */}
            <Button 
                asChild
                variant="outline"
                className="mt-10 border-zinc-800 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all gap-2 px-10 h-12 rounded-xl font-bold uppercase text-[10px] tracking-widest bg-zinc-950 text-zinc-400"
            >
                <Link href="/subscription">
                    Explorar Assinaturas
                </Link>
            </Button>
            
            <p className="mt-6 text-[10px] text-zinc-700 uppercase font-black tracking-widest">
                Pagamentos processados via Stripe®
            </p>
        </div>
    )
} 