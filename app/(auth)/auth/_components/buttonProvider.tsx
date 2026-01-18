
'use client'
import { signIn } from 'next-auth/react'

export const ButtonProvider = ({provider}: {provider: string}) => {
    return (
        <button className="cursor-pointer p-1 bg-white rounded-full" onClick={() => signIn(provider, {redirectTo: '/shop'})}>
            {provider}
        </button>
    )
}