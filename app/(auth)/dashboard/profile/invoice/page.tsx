import { LuFileText } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import {InvoiceCardSkeleton, InvoiceCardList} from './_components/invoiceCard'


const InvoicePage = () => {

    return (
        <div className="w-full max-w-4xl mx-auto py-10 px-6">
            {/* Header da Seção */}
            <div className="flex flex-col gap-2 mb-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                        <LuFileText className="text-blue-500" size={24} />
                    </div>
                    <h1 className="text-2xl font-black italic text-zinc-100 tracking-tight uppercase">
                        Minhas Faturas
                    </h1>
                </div>
                <p className="text-zinc-500 text-sm max-w-md">
                    Histórico detalhado de cobranças. Você pode baixar o PDF oficial da Stripe para sua contabilidade.
                </p>
            </div>

            {/* Lista de Faturas */}
            <Suspense fallback={<InvoiceCardSkeleton/>}>
                <InvoiceCardList/>
            </Suspense>

            {/* Nota de rodapé Estilo Dashboard Profissional */}
            <div className="mt-12 p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center gap-4">
                <div className="size-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                    <LuFileText size={20} />
                </div>
                <div className="flex-1">
                    <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest">Dúvidas sobre faturamento?</h4>
                    <p className="text-[11px] text-zinc-500 max-w-sm">
                        As notas fiscais são enviadas automaticamente para seu e-mail de cadastro em cada renovação.
                    </p>
                </div>
                <Button variant="link" className="text-xs font-bold text-blue-500 uppercase">
                    Falar com Suporte
                </Button>
            </div>
        </div>
    );
};

export default InvoicePage;