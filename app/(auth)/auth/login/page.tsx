'use client'
import Form from 'next/form'
import {useActionState} from 'react'
import { loginForm } from '../_actions'

export const Login = () => {
    const prevState = {sucess: false, error: null as string | null}
    const [state, formAction, pending] = useActionState(loginForm, prevState)

    return (
    <main className="w-full h-screen flex items-center justify-center">
        <div className="bg-blue-800 w-1/4 h-2/5 rounded-2xl flex flex-col items-center">
            <p className='mt-5 text-center text-3xl font-semibold'>Login</p>
            <Form className='w-10/12 flex flex-col gap-3 mt-8' action={formAction}>
                <p className='font-semibold text-1xl'>Email</p>
                <input type="email" name='email' placeholder='Digite seu Email' className='bg-white rounded-md'  required/>
                <p className='font-semibold text-1xl'>Senha</p>
                <input type="password" name='password' placeholder='Digite sua senha' className='bg-white rounded-md'  required/>
                    {state.error && (
                        <p aria-live='polite' className='text-red-500'>{state.error}</p>
                    )}
                    {state.sucess && (
                        <p aria-live='polite' className='text-green-500'>Login Valido!</p>
                    )}
                <button disabled={pending} type='submit' className='cursor-pointer w-2/6 h-1/6 bg-white rounded-md self-center'>
                    {pending ? 'Entrando...' : 'Entrar'}
                </button>
            </Form>
        </div>
    </main>
    )
}

export default Login