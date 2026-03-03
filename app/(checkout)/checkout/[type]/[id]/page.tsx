import { retrieveCheckoutSessionAction, processPurchaseAction } from './actions'
import {SuccessNotification} from './_components/successNotification'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, ShoppingBag, Mail } from 'lucide-react'

const Return = async ({ params }: { params: Promise<{ type: string, id: string }> }) => {
    const { type, id: sessionId } = await params
    
    if (!sessionId) throw new Error('Sessão inválida')

    const session = await retrieveCheckoutSessionAction(sessionId)
    const { status, customer_details } = session
    const customerEmail = customer_details?.email

    if (status === 'open') redirect('/dashboard/cart')

    if (status === 'complete') {
        await processPurchaseAction(sessionId, type)
        return (
            <>
            <SuccessNotification/>
            <div className="flex flex-col mt-8 items-center justify-center min-h-[60vh] px-6">
                {/* Card de Sucesso */}
                
                <div className="w-full max-w-md bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl text-center">
                    
                    {/* Ícone Animado */}
                    <div className="inline-flex items-center justify-center size-20 rounded-full bg-emerald-500/10 mb-8 border border-emerald-500/20">
                        <CheckCircle2 className="size-10 text-emerald-500 animate-in zoom-in duration-500" />
                    </div>

                    <h1 className="text-3xl font-bold text-zinc-100 tracking-tight mb-4">
                        Pedido Confirmado!
                    </h1>
                    
                    <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                        Agradecemos pela confiança. Um e-mail de confirmação foi enviado para{' '}
                        <span className="text-zinc-100 font-medium">{customerEmail}</span>.
                    </p>

                    {/* Detalhes do Suporte */}
                    <div className="bg-zinc-950/50 border border-zinc-800/50 rounded-2xl p-4 mb-8 flex items-center gap-4 text-left">
                        <div className="size-10 rounded-xl bg-zinc-900 flex items-center justify-center shrink-0">
                            <Mail className="size-5 text-zinc-400" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Dúvidas?</p>
                            <a href="mailto:support@exemplo.com" className="text-xs text-zinc-300 hover:text-blue-400 transition-colors">
                                support@exemplo.com
                            </a>
                        </div>
                    </div>

                    {/* Ações de Retorno */}
                    <div className="grid grid-cols-1 gap-3">
                        
                        <Link 
                            href="/shop"
                            className="flex items-center justify-center gap-2 w-full py-3 bg-transparent hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 font-medium rounded-xl transition-all"
                        >
                            <ShoppingBag className="size-4" />
                            Continuar Comprando
                        </Link>
                    </div>
                </div>

                {/* ID da Transação Sutil */}
                <p className="mt-8 text-[10px] text-zinc-600 font-mono uppercase tracking-tighter">
                    Transaction ID: {sessionId}
                </p>
            </div>
            </>
        )
    }

    return null
}

export default Return