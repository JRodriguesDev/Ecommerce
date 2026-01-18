'use client'

import {LoginForm} from '../_components/form'
import {ButtonProvider} from '../_components/buttonProvider'
import { FaUnlockKeyhole } from "react-icons/fa6";
import { useState } from 'react';

export const Login = () => {
    const [showForm, setShowForm] = useState(false)

    return (
        <div className='bg-blue-700 max-w-100 min-h-50 mt-20 m-auto flex flex-col items-center justify-center rounded-2xl'>
            <p className='text-center text-3xl font-semibold my-3'>Login</p>
            {!showForm ? (
                <div className='flex flex-row items-center justify-around my-3 gap-5'>
                    <ButtonProvider provider='google'/>
                    <ButtonProvider provider='discord'/>
                </div>
            ) : (
                <LoginForm/>
            )}
            <button onClick={() => setShowForm(!showForm)} className='my-5 p-1.5 bg-white rounded-md flex items-center gap-2 cursor-pointer'><FaUnlockKeyhole/> Credenciais</button>
        </div>
    )
}

export default Login