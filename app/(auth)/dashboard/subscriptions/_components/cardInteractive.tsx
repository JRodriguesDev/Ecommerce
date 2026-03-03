'use client'

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { LuCircleX, LuLoader } from "react-icons/lu" // Adicionei um ícone de loader
import { cancelPlanAction } from '../actions'
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
            
            {isPending ? "Cancelando..." : "Cancelar Plano"}
        </Button>
    )
}