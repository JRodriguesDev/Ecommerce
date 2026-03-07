'use client'

import { useState } from "react"
import { LuShieldCheck, LuLoader, LuCircleAlert } from "react-icons/lu"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { verify2FaAction } from './actions'
import Form from 'next/form';
import { useActionState } from 'react';
import { FormState } from '../../types';

const prevState: FormState = { success: false, error: null }

const TwoFactor = () => {
    const [code, setCode] = useState("")
    const [state, formAction, pending] = useActionState(verify2FaAction, prevState)

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-zinc-950">
            <Card className="w-full max-w-md bg-zinc-900/20 border-zinc-800/50 backdrop-blur-sm p-8 shadow-2xl space-y-8">

                <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                        <LuShieldCheck size={40} />
                    </div>
                    <h1 className="text-2xl font-black tracking-tighter text-zinc-100 uppercase italic pt-4">
                        2FA Security
                    </h1>
                    <p className="text-zinc-500 text-sm font-medium max-w-[280px]">
                        Enter the code sent to your email to continue.
                    </p>
                </div>

                <div className="flex flex-col items-center space-y-6">
                    <Form action={formAction} id='formComplete'>
                        <input type="hidden" name="code" value={code}/>
                        <InputOTP
                            maxLength={6}
                            value={code}
                            onChange={(value) => setCode(value)}
                            disabled={pending}
                        >
                            <InputOTPGroup className="gap-2">
                                <InputOTPSlot index={0} className="w-12 h-14 border-zinc-800 bg-zinc-950/50 text-white rounded-lg focus:ring-emerald-500" />
                                <InputOTPSlot index={1} className="w-12 h-14 border-zinc-800 bg-zinc-950/50 text-white rounded-lg" />
                                <InputOTPSlot index={2} className="w-12 h-14 border-zinc-800 bg-zinc-950/50 text-white rounded-lg" />
                            </InputOTPGroup>
                            <InputOTPSeparator className="text-zinc-700" />
                            <InputOTPGroup className="gap-2">
                                <InputOTPSlot index={3} className="w-12 h-14 border-zinc-800 bg-zinc-950/50 text-white rounded-lg" />
                                <InputOTPSlot index={4} className="w-12 h-14 border-zinc-800 bg-zinc-950/50 text-white rounded-lg" />
                                <InputOTPSlot index={5} className="w-12 h-14 border-zinc-800 bg-zinc-950/50 text-white rounded-lg" />
                            </InputOTPGroup>
                        </InputOTP>
                    </Form>

                    {/* MENSAGEM DE ERRO */}
                    {state.error && (
                        <div className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 p-3 rounded-lg w-full border border-red-400/20">
                            <LuCircleAlert size={16} />
                            <span>{state.error}</span>
                        </div>
                    )}

                    <Button
                        form='formComplete'
                        type="submit"
                        disabled={pending || code.length < 6}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-widest py-6 transition-all"
                    >
                        {pending ? (
                            <LuLoader className="animate-spin" size={20} />
                        ) : (
                            "Confirmar Acesso"
                        )}
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default TwoFactor