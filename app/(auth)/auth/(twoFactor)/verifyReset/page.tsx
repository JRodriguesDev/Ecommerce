'use client'

import { useActionState, useTransition, useState, useEffect } from 'react';
import Link from 'next/link';
import Form from 'next/form';
import { LuMail, LuArrowLeft, LuLoader, LuShieldCheck, LuCircleAlert } from "react-icons/lu";
import { sendCodeAction, verifyCodeAction } from './actions'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useRouter } from 'next/navigation';
import { FormState } from '../../types'


const prevState: FormState = { success: false, error: null }
const VerifyReset = () => {
    const router = useRouter()
    const [isLoading, startTransition] = useTransition()
    
    // 1. CONTROLADOR DE FLUXO LOCAL (O segredo do reset)
    const [step, setStep] = useState<'EMAIL' | 'OTP'>('EMAIL');
    
    const [state, formAction, pending] = useActionState(sendCodeAction, prevState)
    const [otpCode, setOtpCode] = useState("");
    const [verifyState, setVerifyState] = useState({ sucess: false, err: '' as string | undefined })

    // 2. SINCRONIZA O SUCESSO DO SERVIDOR COM A UI
    useEffect(() => {
        if (state.success) {
            setStep('OTP');
        }
    }, [state.success]);

    // 3. GARANTE QUE AO ENTRAR NA PÁGINA TUDO ESTEJA RESETADO
    useEffect(() => {
        setStep('EMAIL');
        setOtpCode("");
    }, []);

    const handleVerifyOtp = () => {
        startTransition(async () => {
            setVerifyState({ sucess: false, err: '' });
            const data = await verifyCodeAction(otpCode);
            if (!data.success) {
                setVerifyState({ sucess: false, err: data.error });
                setOtpCode(''); 
            } else {
                router.push('/auth/resetPassword');
            }
        })
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-zinc-950">
            <Card className="w-full max-w-sm bg-zinc-900/20 border-zinc-800/50 backdrop-blur-sm shadow-2xl">
                <CardHeader className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                        <Link href="/auth/login" className="text-zinc-500 hover:text-white transition-colors">
                            <LuArrowLeft size={20} />
                        </Link>
                    </div>
                    <CardTitle className="text-2xl font-black uppercase italic tracking-tighter">
                        Reset Password
                    </CardTitle>
                    <CardDescription className="text-zinc-500">
                        {step === 'OTP'
                            ? "Check your email for the 6-digit code."
                            : "Enter your email address to receive a reset code."}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* SÓ MOSTRA O FORM DE EMAIL SE O STEP FOR 'EMAIL' */}
                    {step === 'EMAIL' ? (
                        <Form action={formAction} className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-zinc-400">Email Address</Label>
                                <div className="relative">
                                    <LuMail className="absolute left-3 top-3 text-zinc-600" size={18} />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        disabled={pending}
                                        className="pl-10 bg-zinc-950/50 border-zinc-800 focus:ring-emerald-500"
                                    />
                                </div>
                            </div>
                            
                            {state.error && (
                                <div className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                                    <LuCircleAlert size={16} />
                                    <span>{state.error}</span>
                                </div>
                            )}

                            <Button type="submit" disabled={pending} className="w-full bg-emerald-600 font-bold py-6">
                                {pending ? <LuLoader className="animate-spin" size={20} /> : "Send Reset Link"}
                            </Button>
                        </Form>
                    ) : (
                        /* SEÇÃO DO OTP - Só aparece se o step for 'OTP' */
                        <div className="flex flex-col items-center space-y-4 animate-in fade-in zoom-in duration-300">
                            <div className="flex items-center gap-2 text-emerald-500 text-sm font-bold">
                                <LuShieldCheck size={16} />
                                <span>Code sent!</span>
                                <button 
                                    onClick={() => setStep('EMAIL')} 
                                    className="text-[10px] underline text-zinc-500 hover:text-zinc-300 ml-auto"
                                >
                                    Change Email
                                </button>
                            </div>

                            <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode} disabled={isLoading}>
                                <InputOTPGroup className="gap-2">
                                    {[...Array(6)].map((_, i) => (
                                        <InputOTPSlot key={i} index={i} className="bg-zinc-950 border-zinc-800 text-white w-10 h-12" />
                                    ))}
                                </InputOTPGroup>
                            </InputOTP>

                            {verifyState.err && (
                                <div className="w-full text-center text-xs font-bold text-red-500 bg-red-500/10 p-2 rounded border border-red-500/20">
                                    ⚠️ {verifyState.err}
                                </div>
                            )}

                            <Button
                                onClick={handleVerifyOtp}
                                disabled={otpCode.length < 6 || isLoading}
                                className="w-full bg-zinc-950 text-emerald-500 border border-emerald-500/20 py-6"
                            >
                                {isLoading ? <LuLoader className="animate-spin" /> : "Verify Code"}
                            </Button>
                        </div>
                    )}
                </CardContent>
                {/* ... footer */}
            </Card>
        </div>
    );
}

export default VerifyReset;