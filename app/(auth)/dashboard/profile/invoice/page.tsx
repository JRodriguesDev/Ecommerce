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
                        My Invoices
                    </h1>
                </div>
                <p className="text-zinc-500 text-sm max-w-md">
                    Detailed billing history. You can download the official Stripe PDF for your accounting.
                </p>
            </div>

            {/* Lista de Faturas */}
            <Suspense fallback={<InvoiceCardSkeleton/>}>
                <InvoiceCardList/>
            </Suspense>

        </div>
    );
};

export default InvoicePage;