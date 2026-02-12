'use client'

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Form from 'next/form'
import { LuCircleCheck, LuLoader, LuUser, LuTriangleAlert, LuLock } from "react-icons/lu"
import { FormState } from '../types';
import { completeRegistration } from './actions' // Lembre-se de atualizar a action para receber o password!
import {useSession} from 'next-auth/react'
import { useEffect } from "react"
import { useRouter } from "next/navigation"

const prevState: FormState = { success: false, error: null }

export const CompleteRegistration = () => {
    const [state, formAction, pending] = useActionState(completeRegistration, prevState)
    const {update} = useSession()
    const router = useRouter()
    useEffect(() => {
        if (state.success) {
            (async () => {
                await update({needsProfile: false})
                router.push('/shop')
                router.refresh() // Garante que o servidor perceba a mudança
            })()
        }
    }, [state])

    return (
        <div className="flex flex-col items-center justify-center min-h-[90vh] bg-black px-4">
            <div className="w-full max-w-md p-8 bg-zinc-950 border border-zinc-900 rounded-2xl shadow-2xl">
                
                {/* Cabeçalho */}
                <div className="flex flex-col items-center mb-6">
                    <div className="p-3 bg-blue-500/10 rounded-full mb-3">
                        <LuCircleCheck className="text-blue-500" size={32} />
                    </div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Quase lá!</h2>
                    <p className="text-zinc-400 text-sm text-center mt-1">
                        Complete seu perfil para garantir o acesso total à sua conta.
                    </p>
                </div>

                <Form action={formAction} className="space-y-5">
                    
                    {/* CAMPO: NOME */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                            Como devemos te chamar?
                        </label>
                        <div className="relative">
                            <LuUser className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                required
                                disabled={pending}
                                placeholder="Nome completo ou apelido"
                                className="pl-10 bg-zinc-900 border-zinc-800 text-white py-6 focus:ring-blue-600 transition-all placeholder:text-zinc-700"
                            />
                        </div>
                    </div>

                    {/* CAMPO: SENHA */}
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                            Defina uma senha de acesso
                        </label>
                        <div className="relative">
                            <LuLock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                disabled={pending}
                                placeholder="Mínimo 8 caracteres"
                                className="pl-10 bg-zinc-900 border-zinc-800 text-white py-6 focus:ring-blue-600 transition-all placeholder:text-zinc-700"
                            />
                        </div>
                        <p className="text-[10px] text-zinc-600 italic px-1">
                            * Você poderá usar esta senha para entrar sem depender do Discord/Google.
                        </p>
                    </div>

                    {/* Exibição de Erros */}
                    {state?.error && (
                        <div 
                            role="alert"
                            className="p-3 text-sm font-medium border rounded-lg bg-destructive/10 border-destructive/20 text-red-500 flex items-center gap-2 animate-in fade-in slide-in-from-top-1"
                        >
                            <LuTriangleAlert size={16} />
                            {state.error}
                        </div>
                    )}

                    <Button 
                        type="submit"
                        disabled={pending}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 transition-all active:scale-[0.98] shadow-lg shadow-blue-500/10"
                    >
                        {pending ? (
                            <div className="flex items-center gap-2">
                                <LuLoader className="animate-spin" size={20} />
                                <span>Finalizando...</span>
                            </div>
                        ) : (
                            "CONCLUIR REGISTRO"
                        )}
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default CompleteRegistration