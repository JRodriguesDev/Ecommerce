'use client'

import { useState } from 'react'
import Form from 'next/form';
import { LuWand, LuLoader, LuMail, LuCircleAlert } from "react-icons/lu"
import { useActionState } from 'react';
import { magicLinkAction } from './actions'
import { FormState } from '../types';

const prevState: FormState = { success: false, error: null }

const MagicLink = () => {
    const [state, formAction, pending] = useActionState(magicLinkAction, prevState)
    const [email, setEmail] = useState("")

    return (
        <div className="mt-15 w-full max-w-md mx-auto p-6 bg-zinc-950 border border-zinc-900 rounded-2xl shadow-2xl">
            <div className="flex flex-col items-center mb-8">
                <div className="p-3 bg-blue-500/10 rounded-full mb-4">
                    <LuMail className="text-blue-500" size={28} />
                </div>
                <h1 className="text-2xl font-bold text-white">Login Mágico</h1>
                <p className="text-zinc-400 text-sm text-center mt-2">
                    We&apos;ll send an instant access link to your email.
                    No passwords, no hassle.
                </p>
            </div>

            <Form action={formAction} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-zinc-300 ml-1">
                        Your best email
                    </label>
                    <input
                        id="email"
                        type="text"
                        name='email'
                        placeholder="exemplo@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                    {state?.error && (
                        <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-tight ml-1 animate-in fade-in slide-in-from-top-1">
                            <LuCircleAlert size={14} />
                            <span>{state.error}</span>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={pending || !email}
                    className="w-full group relative flex items-center justify-center gap-2 bg-white text-black font-bold py-3 px-4 rounded-xl hover:bg-zinc-200 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                >
                    {pending ? (
                        <LuLoader className="animate-spin" size={20} />
                    ) : (
                        <>
                            <span>Enviar Link</span>
                            <LuWand size={18} className="group-hover:rotate-12 transition-transForm" />
                        </>
                    )}

                    {/* Efeito visual de brilho no hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                </button>
            </Form>

            <p className="mt-6 text-center text-xs text-zinc-500">
                By entering, you agree to our Terms of Service.
            </p>
        </div>
    )
}

export default MagicLink