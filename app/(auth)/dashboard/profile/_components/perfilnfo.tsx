'use client'

import { useSession } from "next-auth/react"
import { LuCamera } from "react-icons/lu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

const PerfilInfo = () => {
    const { data: session, status } = useSession()

    // 1. Faxina: Estado de Carregamento (Evita o pulo de layout)
    if (status === "loading") {
        return (
            <div className="flex flex-col md:flex-row items-center gap-6 mt-6 animate-pulse">
                <Skeleton className="size-28 rounded-full bg-zinc-900 border-2 border-zinc-800" />
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48 bg-zinc-900" />
                    <Skeleton className="h-4 w-32 bg-zinc-900" />
                </div>
            </div>
        )
    }

    // 2. Faxina: Pegar iniciais do nome de forma limpa
    const getInitials = (name?: string | null) => {
        if (!name) return "NX"
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2)
    }

    return (
        <div className="flex flex-col md:flex-row items-center gap-6 mt-6 group">
            <div className="relative">
                <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full group-hover:bg-blue-500/20 transition-colors" />
                
                <Avatar className="size-28 border-4 border-zinc-950 ring-1 ring-zinc-800 shadow-2xl relative z-10">
                    <AvatarImage src={session?.user?.image || ''} className="object-cover" />
                    <AvatarFallback className="bg-zinc-900 text-2xl font-black text-zinc-400">
                        {getInitials(session?.user?.name)}
                    </AvatarFallback>
                </Avatar>

                {/* Botão de Trocar Foto */}
                <button className="absolute bottom-0 right-0 p-2.5 bg-blue-600 rounded-full border-4 border-zinc-950 text-white shadow-xl hover:bg-blue-500 hover:scale-110 transition-all z-20 cursor-pointer">
                    <LuCamera className="size-4" />
                </button>
            </div>

            <div className="text-center md:text-left space-y-1">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-1">
                        Cliente
                    </span>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-zinc-100 uppercase leading-none">
                        {session?.user?.name || "Usuário"}
                    </h1>
                </div>
                <p className="text-zinc-500 text-sm font-medium">
                    {session?.user?.email}
                </p>
            </div>
        </div>
    )
}

export default PerfilInfo