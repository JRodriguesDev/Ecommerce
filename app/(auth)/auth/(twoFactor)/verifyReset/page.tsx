'use client'

import { useActionState, useState } from 'react';
import Link from 'next/link';
import Form from 'next/form';
import { LuMail, LuArrowLeft, LuLoader, LuShieldCheck } from "react-icons/lu";
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
import {FormState} from '../../types'


const prevState: FormState = {success: false, error: null}

const VerifyReset = () => {
    const router = useRouter()
    const [state, formAction, pending] = useActionState(sendCodeAction, prevState)
    const [otpCode, setOtpCode] = useState("");
    const [isLoading, setIsloading] = useState(false)
    const [verifyState, setVerifyState] = useState<{sucess: boolean, err: string | undefined}>({sucess: false, err: ''})

    const handleVerifyOtp = async () => {
    setIsloading(true);
    setVerifyState({ sucess: false, err: '' }); // Resetamos para o estado inicial

    const data = await verifyCodeAction(otpCode);

    if (!data.success) {
        // Se deu erro, sucess é false e setamos o erro
        setVerifyState({ sucess: false, err: data.error });
        setOtpCode(''); // Limpa o campo se errar
    } else {
        // Se deu certo, vai para a próxima página
        router.push('/auth/resetPassword');
    }
    
    setIsloading(false);
};

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-zinc-950">
            <Card className="w-full max-w-sm bg-zinc-900/20 border-zinc-800/50 backdrop-blur-sm shadow-2xl transition-all duration-500">
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
                        {state.success 
                            ? "Check your email for the 6-digit code." 
                            : "Enter your email address to receive a reset code."}
                    </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                    <Form action={formAction} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-zinc-400">Email Address</Label>
                            <div className="relative">
                                <LuMail className="absolute left-3 top-3 text-zinc-600" size={18} />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    disabled={pending || state.success}
                                    className="pl-10 bg-zinc-950/50 border-zinc-800 focus:ring-emerald-500 disabled:opacity-50"
                                />
                            </div>
                        </div>

                        {!state.success && (
                            <Button 
                                type="submit" 
                                disabled={pending} 
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-widest py-6"
                            >
                                {pending ? <LuLoader className="animate-spin" size={20} /> : "Send Reset Link"}
                            </Button>
                        )}
                    </Form>

                    {/* SEÇÃO DO OTP - Aparece após o envio do e-mail */}
                    {state.success && (
                        <div className="flex flex-col items-center space-y-4 animate-in fade-in zoom-in duration-300">
                            <div className="flex items-center gap-2 text-emerald-500 text-sm font-bold mb-2">
                                <LuShieldCheck size={16} />
                                <span>Code sent successfully!</span>
                            </div>
                            
                            <InputOTP 
                                maxLength={6} 
                                value={otpCode} 
                                onChange={(val) => setOtpCode(val)}
                            >
                                <InputOTPGroup className="gap-2">
                                    <InputOTPSlot index={0} className="bg-zinc-950 border-zinc-800 text-white w-10 h-12" />
                                    <InputOTPSlot index={1} className="bg-zinc-950 border-zinc-800 text-white w-10 h-12" />
                                    <InputOTPSlot index={2} className="bg-zinc-950 border-zinc-800 text-white w-10 h-12" />
                                    <InputOTPSlot index={3} className="bg-zinc-950 border-zinc-800 text-white w-10 h-12" />
                                    <InputOTPSlot index={4} className="bg-zinc-950 border-zinc-800 text-white w-10 h-12" />
                                    <InputOTPSlot index={5} className="bg-zinc-950 border-zinc-800 text-white w-10 h-12" />
                                </InputOTPGroup>
                            </InputOTP>
                            {verifyState.err && (
                                <div className="w-full text-center text-xs font-bold text-red-500 bg-red-500/10 p-2 rounded border border-red-500/20 animate-in fade-in slide-in-from-top-1">
                                    ⚠️ {verifyState.err}
                                </div>
                            )}
                            <Button 
                                onClick={handleVerifyOtp}
                                disabled={otpCode.length < 6 || isLoading} // Adicionei o isLoading se você estiver usando
                                className="w-full bg-zinc-950 hover:bg-zinc-900 text-emerald-500 border border-emerald-500/20 hover:border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] font-black uppercase tracking-[0.2em] py-6 transition-all duration-300 group"
                            >
                                {isLoading ? (
                                    <LuLoader className="animate-spin" size={20} />
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <span>Verify Code</span>
                                        <LuShieldCheck className="group-hover:scale-110 transition-transform" size={18} />
                                    </div>
                                )}
                            </Button>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex justify-center border-t border-zinc-800/50 mt-4 pt-6">
                    <Link href="/auth/login" className="text-sm text-zinc-500 hover:text-emerald-500 transition-colors">
                        Back to Login
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}

export default VerifyReset;