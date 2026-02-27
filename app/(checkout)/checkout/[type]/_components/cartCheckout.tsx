'use client'

import { loadStripe } from '@stripe/stripe-js'
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'
import { ShieldCheck, Truck, RefreshCcw } from 'lucide-react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC!)

export const CartCheckout = ({ client }: { client: string }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl mx-auto py-10 px-6">
            
            {/* COLUNA ESQUERDA: O FORMULÁRIO */}
            <div className="flex flex-col gap-6">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">Pagamento</h2>
                    <p className="text-zinc-400 text-sm">Finalize sua compra de forma segura.</p>
                </div>

                <div id='checkout' className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden p-4 shadow-2xl">
                    <EmbeddedCheckoutProvider
                        stripe={stripePromise}
                        options={{ clientSecret: client }}
                    >
                        <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>
                </div>
            </div>

            {/* COLUNA DIREITA: CONFIANÇA E DETALHES */}
            <div className="flex flex-col gap-8 lg:sticky lg:top-24 h-fit">
                {/* Benefícios (Garante que o usuário não desista) */}
                <div className="grid grid-cols-1 gap-4">
                    <Benefit icon={<ShieldCheck className="text-blue-500" />} title="Pagamento Criptografado" desc="Seus dados estão 100% protegidos pela Stripe." />
                    <Benefit icon={<Truck className="text-blue-500" />} title="Entrega Rápida" desc="Processamento imediato após a confirmação." />
                    <Benefit icon={<RefreshCcw className="text-blue-500" />} title="Devolução Fácil" desc="Até 7 dias para cancelamento sem burocracia." />
                </div>

                {/* Banner de Ajuda */}
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                    <h3 className="text-sm font-semibold text-zinc-100 mb-2">Precisa de ajuda?</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                        Se tiver dúvidas sobre o pagamento ou sobre o seu pedido, fale com nosso suporte via chat ou email.
                    </p>
                </div>
            </div>
        </div>
    )
}

// Componente auxiliar de Benefício
const Benefit = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <div className="flex gap-4 p-4 rounded-xl border border-zinc-800/50 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors">
        <div className="mt-1">{icon}</div>
        <div>
            <h4 className="text-sm font-medium text-zinc-200">{title}</h4>
            <p className="text-xs text-zinc-500">{desc}</p>
        </div>
    </div>
)