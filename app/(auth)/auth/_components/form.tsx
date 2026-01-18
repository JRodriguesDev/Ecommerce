'use client'

import Form from 'next/form'
import { useActionState } from 'react';
import {registerForm, loginForm} from '../actions'

const prevState = {sucess: false, error: null as string | null}

export const LoginForm = () => {
    const [state, formAction, pending] = useActionState(loginForm, prevState)
    
    return (
        <div className='w-full h-44 rounded-2xl flex flex-col items-center gap-5'>
            <Form 
                className='w-4/6 flex flex-col gap-2 mt-3'
                action={formAction}>
                <p className='font-semibold text-1xl'>Email</p>
                <input type="email" name='email' placeholder='Digite seu Email' className='bg-white rounded-md' required/>
                <p className='font-semibold text-1xl'>Senha</p>
                <input type="password" name='password' placeholder='Digite sua senha' className='bg-white rounded-md' required/>
                {state.error && (
                    <p aria-live='polite' className='text-red-500'>{state.error}</p>
                )}
                {state.sucess && (
                    <p aria-live='polite' className='text-green-500'>Login Valido!</p>
                )}
                <button disabled={pending} type='submit' className='mt-3 cursor-pointer w-2/6 h-1/6 bg-white rounded-md self-end'>
                    {pending ? 'Entrando...' : 'Entrar'}
                </button>
            </Form>
        </div>
    )
}

export const RegisterForm = () => {
    const [state, formAction, peding] = useActionState(registerForm, prevState)
    
    return (
        <div className='w-full h-56 rounded-2xl flex flex-col items-center gap-5'>
            <Form 
                className='w-4/6 flex flex-col gap-2 mt-3'
                action={formAction}>
                <p className='font-semibold text-1xl'>Name</p>
                <input type="text" name='name' placeholder='Digite seu Nome' className='bg-white rounded-md' required/>
                <p className='font-semibold text-1xl'>Email</p>
                <input type="email" name='email' placeholder='Digite seu Email' className='bg-white rounded-md' required/>
                <p className='font-semibold text-1xl'>Senha</p>
                <input type="password" name='password' placeholder='Digite sua senha' className='bg-white rounded-md' required/>
                {state.error && (
                    <p aria-live='polite' className='text-red-500'>{state.error}</p>
                )}
                {state.sucess && (
                    <p aria-live='polite' className='text-green-500'>Logado!</p>
                )}
                <button type='submit' className='cursor-pointer w-2/6 h-1/6 bg-white rounded-md self-end'>
                {peding ? 'Registrando...' : 'Registrar'}
                </button>
            </Form>
        </div>
    )
}