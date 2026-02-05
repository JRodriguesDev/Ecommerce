'use client'

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { LuRefreshCw } from "react-icons/lu"
import { IoAlertCircleOutline } from "react-icons/io5"

const Error = ({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) => {
    
    useEffect(() => {
        // Log técnico para desenvolvedores
        console.error("Authentication Area Error:", error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center mt-30 space-y-6 p-8 border border-zinc-800 rounded-2xl bg-zinc-900/50 backdrop-blur-sm max-w-sm mx-auto">
            <div className="size-12 rounded-full bg-destructive/10 flex items-center justify-center border border-destructive/20">
                <IoAlertCircleOutline className="text-destructive size-6" />
            </div>
            
            <div className="text-center space-y-2">
                <h2 className="text-zinc-100 font-bold tracking-tight text-xl uppercase">
                    Auth System Error
                </h2>
                <p className="text-zinc-500 text-sm leading-relaxed">
                    We encountered a problem while loading the authentication pages. 
                    Please try again to access your account.
                </p>
            </div>

            <div className="flex flex-col w-full gap-2">
                <Button onClick={() => reset()} className="w-full gap-2 font-bold uppercase text-[11px] tracking-widest">
                    <LuRefreshCw size={14} />
                    Retry Authentication
                </Button>
                
                <Button 
                    onClick={() => window.location.reload()} 
                    variant="ghost" 
                    className="w-full text-zinc-500 hover:text-zinc-200 text-xs"
                >
                    Or refresh the browser
                </Button>
            </div>
            
            {error.digest && (
                <p className="text-[10px] text-zinc-700 font-mono pt-2 border-t border-zinc-800 w-full text-center">
                    AUTH_TRACE_ID: {error.digest}
                </p>
            )}
        </div>
    )
}

export default Error