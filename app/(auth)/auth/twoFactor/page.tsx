'use client'

import { useState } from "react"
import { LuShieldCheck, LuLoader, LuCircleAlert } from "react-icons/lu"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation" // Importante para o redirect
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { verify2Fa } from './actions'
import {signIn} from 'next-auth/react'

const TwoFactor = () => {
    const [code, setCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleVerify = async () => {
        if (code.length < 6) return
        
        setIsLoading(true)
        setError(null) // Reseta erros anteriores

        try {
            const result = await verify2Fa(code)

            if (result.success) {
                // Redireciona para a home ou dashboard
                console.log(result)
                await signIn('credentials', {email: result.email, is2FaVerified: result.success, redirectTo: '/shop'})
            } else {
                setError(result.error || "Erro desconhecido")
                setCode("") // Limpa o campo se errar
            }
        } catch (err) {
            setError("Falha na comunicação com o servidor.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-zinc-950">
            <Card className="w-full max-w-md bg-zinc-900/20 border-zinc-800/50 backdrop-blur-sm p-8 shadow-2xl space-y-8">
                
                <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                        <LuShieldCheck size={40} />
                    </div>
                    <h1 className="text-2xl font-black tracking-tighter text-zinc-100 uppercase italic pt-4">
                        Segurança 2FA
                    </h1>
                    <p className="text-zinc-500 text-sm font-medium max-w-[280px]">
                        Digite o código enviado ao seu e-mail para continuar.
                    </p>
                </div>

                <div className="flex flex-col items-center space-y-6">
                    <InputOTP 
                        maxLength={6} 
                        value={code}
                        onChange={(value) => setCode(value)}
                        disabled={isLoading}
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

                    {/* MENSAGEM DE ERRO */}
                    {error && (
                        <div className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 p-3 rounded-lg w-full border border-red-400/20">
                            <LuCircleAlert size={16} />
                            <span>{error}</span>
                        </div>
                    )}

                    <Button 
                        onClick={handleVerify}
                        disabled={isLoading || code.length < 6}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-widest py-6 transition-all"
                    >
                        {isLoading ? (
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