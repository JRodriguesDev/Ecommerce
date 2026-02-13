'use client'

import { useState } from "react"
import { LuShieldCheck, LuLoader, LuArrowLeft } from "react-icons/lu"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

const TwoFactor = () => {
    const [code, setCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleVerify = async () => {
        if (code.length < 6) return
        
        setIsLoading(true)
        console.log("Validando código:", code)
        
        // Simulação de verificação no banco
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-zinc-950">
            <Card className="w-full max-w-md bg-zinc-900/20 border-zinc-800/50 backdrop-blur-sm p-8 shadow-2xl space-y-8">
                
                {/* CABEÇALHO */}
                <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                        <LuShieldCheck size={40} />
                    </div>
                    <h1 className="text-2xl font-black tracking-tighter text-zinc-100 uppercase italic pt-4">
                        Segurança 2FA
                    </h1>
                    <p className="text-zinc-500 text-sm font-medium max-w-[280px]">
                        Digite o código de verificação para confirmar sua identidade.
                    </p>
                </div>

                {/* AREA DO INPUT - Estrutura corrigida para evitar erro de Contexto */}
                <div className="flex flex-col items-center space-y-6">
                    <InputOTP 
                        maxLength={6} 
                        value={code}
                        onChange={(value) => setCode(value)}
                    >
                        <InputOTPGroup className="gap-2">
                            <InputOTPSlot index={0} className="w-12 h-14 border-zinc-800 bg-zinc-950/50 text-white rounded-lg" />
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