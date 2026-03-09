"use client";

import { useActionState, useState } from "react"; // Adicionado useEffect
import Link from "next/link";
import Form from "next/form";
import {
    LuLock,
    LuEye,
    LuEyeOff,
    LuLoader,
    LuCircleCheck,
} from "react-icons/lu";
import { updatePasswordAction } from "./actions";

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
import { FormState } from "../../types";

const prevState: FormState = { success: false, error: null };

const NewPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [state, formAction, pending] = useActionState(
        updatePasswordAction,
        prevState,
    );

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-zinc-950">
            <Card className="w-full max-w-sm bg-zinc-900/20 border-zinc-800/50 backdrop-blur-sm shadow-2xl">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-black uppercase italic tracking-tighter text-white">
                        Create New Password
                    </CardTitle>
                    <CardDescription className="text-zinc-500">
                        Enter your new password below to secure your account.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Form action={formAction} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="password" className="text-zinc-400">
                                New Password
                            </Label>
                            <div className="relative">
                                <LuLock
                                    className="absolute left-3 top-3 text-zinc-600"
                                    size={18}
                                />
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    disabled={pending || state?.success}
                                    className="pl-10 pr-10 bg-zinc-950/50 border-zinc-800 focus:ring-emerald-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-zinc-600 hover:text-zinc-400"
                                >
                                    {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword" className="text-zinc-400">
                                Confirm Password
                            </Label>
                            <div className="relative">
                                <LuLock
                                    className="absolute left-3 top-3 text-zinc-600"
                                    size={18}
                                />
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    disabled={pending || state?.success}
                                    className="pl-10 bg-zinc-950/50 border-zinc-800 focus:ring-emerald-500"
                                />
                            </div>
                        </div>

                        {state?.error && (
                            <div className="text-xs font-bold text-destructive bg-destructive/10 p-2 rounded border border-destructive/20 animate-in fade-in slide-in-from-top-1 flex items-center gap-2">
                                <span>⚠️</span> {state.error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={pending || state?.success}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-widest py-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                        >
                            {pending ? (
                                <LuLoader className="animate-spin" size={20} />
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span>{state?.success ? "Success!" : "Update Password"}</span>
                                    <LuCircleCheck size={18} />
                                </div>
                            )}
                        </Button>
                    </Form>
                </CardContent>

                <CardFooter className="flex justify-center border-t border-zinc-800/50 mt-4 pt-6">
                    <Link
                        href="/auth/login"
                        className="text-sm text-zinc-500 hover:text-emerald-500 transition-colors"
                    >
                        Cancel and return to Login
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};

export default NewPassword;
