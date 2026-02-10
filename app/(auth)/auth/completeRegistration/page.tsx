'use client'

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Form from 'next/form' // Utilizando o componente de Form do Next.js
import { LuCircleCheck, LuLoader, LuUser, LuTriangleAlert } from "react-icons/lu"
import { FormState } from '../types';
import { registerName } from '../actions'

const prevState: FormState = { success: false, error: null }

export const CompleteRegistration = () => {
    // Implementação do useActionState vinculada à sua Server Action
    const [state, formAction, pending] = useActionState(registerName, prevState)

    return (
        <div className="flex flex-col items-center justify-center min-h-[90vh] bg-black px-4">
            <div className="w-full max-w-md p-8 bg-zinc-950 border border-zinc-900 rounded-2xl shadow-2xl">
                
                {/* Cabeçalho de Sucesso do E-mail */}
                <div className="flex flex-col items-center mb-6">
                    <div className="p-3 bg-emerald-500/10 rounded-full mb-3">
                        <LuCircleCheck className="text-emerald-500" size={32} />
                    </div>
                    <h2 className="text-xl font-bold text-white">E-mail verificado!</h2>
                    <p className="text-zinc-400 text-sm text-center">
                        Para finalizar, como gostaria de ser chamado em nossa loja?
                    </p>
                </div>

                {/* Formulário com Server Action */}
                <Form action={formAction} className="space-y-5">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-semibold text-zinc-500 uppercase ml-1">
                            Nome Completo
                        </label>
                        <div className="relative">
                            <LuUser className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                            <Input
                                id="name"
                                name="name"
                                required
                                disabled={pending}
                                placeholder="Seu nome aqui"
                                className="pl-10 bg-zinc-900 border-zinc-800 text-white py-6 focus:ring-blue-600 transition-all"
                            />
                        </div>

                        {/* Exibição de Erros vindo da Action */}
                        {state?.error && (
                            <div 
                                role="alert"
                                className="p-3 text-sm font-medium border rounded-lg bg-destructive/10 border-destructive/20 text-red-500 flex items-center gap-2 animate-in fade-in slide-in-from-top-1"
                            >
                                <LuTriangleAlert size={16} />
                                {state.error}
                            </div>
                        )}
                    </div>

                    <Button 
                        type="submit"
                        disabled={pending}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 transition-all active:scale-[0.98]"
                    >
                        {pending ? (
                            <div className="flex items-center gap-2">
                                <LuLoader className="animate-spin" size={20} />
                                <span>Salvando perfil...</span>
                            </div>
                        ) : (
                            "Concluir Registro"
                        )}
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default CompleteRegistration