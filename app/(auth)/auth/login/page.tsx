'use client'

import { signIn } from 'next-auth/react'
import { useActionState } from 'react';
import {loginForm} from '../actions'
import Form from 'next/form'
import Link from 'next/link';
import {FormState} from '../types'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Spinner } from '@/components/ui/spinner';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaGoogle } from "react-icons/fa";


const prevState: FormState = {sucess: false, error: null}

const Login = () => {
    const [state, formAction, peding] = useActionState(loginForm, prevState)
    console.log(state)

    return (
        <Card className='w-full max-w-sm m-auto mt-25'>
            <CardHeader>
                <CardTitle>Login your account</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
                <CardAction>
                    <Button variant="link"><Link href='/auth/register'>Sign Up</Link></Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <Form action={formAction} id='formLogin'>
                    <div className='flex flex-col gap-6'>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                name='email'
                                type="email"
                                placeholder="email@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                            </div>
                            <Input name='password' type="password" required />
                            {state?.error && (
                                <div 
                                    role="alert" 
                                    aria-live="polite" 
                                    className="p-3 text-sm font-medium border rounded-lg bg-destructive/10 border-destructive/20 text-destructive flex items-center gap-2 animate-in fade-in slide-in-from-top-1"
                                >
                                    <span>⚠️</span>
                                    {state.error}
                                </div>
                            )}
                        </div>
                    </div>
                </Form>
            </CardContent>
            <CardFooter className='flex-col gap-2 cursor-pointer'>
                <Button disabled={peding} form='formLogin' type="submit" className="w-full">
                    {peding ? (
                        <>
                            <Spinner className='size-5'/> Processing
                        </>
                    ) : (
                        'Login'
                    )}
                </Button>
                <Button variant="outline" type='button' className="w-full flex flex-row gap-2 cursor-pointer" onClick={() => signIn('google', {redirectTo: '/shop'})}>
                <FaGoogle/> Login with Google
                </Button>
            </CardFooter>
        </Card>
    );
}

export default Login
