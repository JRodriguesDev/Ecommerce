'use client'

import { Card } from "@/components/ui/card"
import { FaGoogle, FaDiscord } from "react-icons/fa";
import { cn } from "@/lib/utils";
import {signIn, useSession} from 'next-auth/react'
import { useRouter } from "next/navigation";
import {unlikedAction} from '../actions'

const SUPPORTED_PROVIDERS = [
    {
        id: "google",
        name: "Google",
        icon: <FaGoogle size={18} />,
        color: "group-hover:text-blue-400"
    },
    {
        id: "discord",
        name: "Discord",
        icon: <FaDiscord size={20} />,
        color: "group-hover:text-[#5865F2]"
    }
]

export const ConnectionCard = ({ connectedProviders }: { connectedProviders: string[] }) => {

    return (
        <Card className="bg-zinc-900/20 border-zinc-800/50 backdrop-blur-sm divide-y divide-zinc-800/50 overflow-hidden shadow-xl">
            {SUPPORTED_PROVIDERS.map((provider) => {
                const isConnected = connectedProviders.includes(provider.id);

                return (
                    <div 
                        key={provider.id} 
                        className="p-6 flex items-center justify-between hover:bg-zinc-800/10 transition-all group"
                    >
                        <div className="flex items-center gap-5">
                            {/* ÍCONE DO PROVIDER */}
                            <div className={cn(
                                "size-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-500 transition-all duration-300",
                                provider.color,
                                isConnected && "border-zinc-700 text-zinc-300"
                            )}>
                                {provider.icon}
                            </div>

                            <div className="space-y-1">
                                <p className="text-sm font-black text-zinc-100 uppercase tracking-tighter">
                                    {provider.name}
                                </p>
                                
                                {/* STATUS COM INDICADOR VISUAL */}
                                <div className="flex items-center gap-2">
                                    <div className={cn(
                                        "size-1.5 rounded-full animate-pulse",
                                        isConnected ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-zinc-700"
                                    )} />
                                    <span className={cn(
                                        "text-[10px] font-bold uppercase tracking-widest",
                                        isConnected ? "text-emerald-500/80" : "text-zinc-500"
                                    )}>
                                        {isConnected ? 'Linked Account' : 'Unidentified'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* BOTÃO DE AÇÃO */}
                        <ActionButton isConnected={isConnected} provider={provider.id}/>
                    </div>
                );
            })}
        </Card>
    )
}

const ActionButton = ({isConnected, provider}: {isConnected: boolean, provider: string}) => {
    const {data: session, update} = useSession()
    const router = useRouter()
    const handlerUnlink = async (provider: string) => {
        await update({image: '#'})
        await unlikedAction(session!.user!.id!, provider)
        router.refresh()
    }
    return (
        <>
            {isConnected ? (
                <button onClick={() => handlerUnlink(provider)} className={"px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 bg-zinc-900 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 border border-zinc-800"}>
                Unlink
            </button>
            ) : (
                <button onClick={() => signIn(provider)} className={
                "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/10"}>
                Connect Now
            </button>
            )}
        </>
    )
}