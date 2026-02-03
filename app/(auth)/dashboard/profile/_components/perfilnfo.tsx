'use client'

import { useSession } from "next-auth/react"

import { 
    LuCamera,
} from "react-icons/lu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const PerfilInfo = () => {
    const { data: session } = useSession()

    return (
        <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
                        <div className="relative">
                            <Avatar className="size-28 border-2 border-zinc-800">
                                <AvatarImage src={session?.user?.image || ''} />
                                <AvatarFallback className="bg-zinc-900 text-2xl font-bold">JS</AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-1 -right-1 p-2 bg-blue-600 rounded-full border-4 border-black">
                                <LuCamera className="size-3 text-white" />
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-black tracking-tighter text-zinc-100 uppercase">{session?.user?.name}</h1>
                        </div>
        </div>
    )
}

export default PerfilInfo