'use client'

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { LuCircleX, LuLoader, LuRefreshCw } from "react-icons/lu" // Adicionei um ícone de loader
import { cancelPlanAction, toggleChargeAction } from '../actions'
import { useRouter } from "next/navigation"

export const CancelButton = () => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const handleCancel = () => {
        startTransition(async () => {
            await cancelPlanAction()
            router.refresh()
        })
    }

    return (
        <Button 
            onClick={handleCancel}
            disabled={isPending} // Desabilita o botão durante o processo
            variant="ghost" 
            className="w-full justify-start gap-2 text-red-500/70 hover:text-red-500 hover:bg-red-500/5 font-bold text-xs uppercase"
        >
            {isPending ? (
                <LuLoader className="size-4 animate-spin" /> 
            ) : (
                <LuCircleX className="size-4" />
            )}
            
            {isPending ? "Canceling..." : "Cancel Plan"}
        </Button>
    )
}

export const ToggleChargeButton = () => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const handleToggle = () => {
        startTransition(async () => {
            await toggleChargeAction()
            router.refresh()
        })
    }

    return (
        <Button 
            onClick={handleToggle}
            // 1. Desabilita o botão enquanto carrega
            disabled={isPending}
            variant="ghost" 
            size="icon" 
            // 2. Muda a opacidade se estiver pendente
            className="h-8 w-8 text-zinc-600 hover:text-white hover:bg-zinc-800 ml-2 disabled:opacity-50"
            title="Change method"
        >
            {/* 3. Adiciona a classe animate-spin condicionalmente */}
            <LuRefreshCw 
                size={14} 
                className={isPending ? "animate-spin" : ""} 
            />
        </Button>
    )
}