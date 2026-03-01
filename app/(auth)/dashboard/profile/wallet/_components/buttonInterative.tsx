'use client'

import { useTransition } from 'react'
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { LuTrash2, LuLoader } from "react-icons/lu"
import { removePaymentMethodAction } from '../actions'
import { useRouter } from 'next/navigation'

export const RemoveCardButton = ({ id }: { id: string }) => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleRemove = () => {
        // O startTransition avisa ao React que essa mudança de estado é uma transição
        startTransition(async () => {
            await removePaymentMethodAction(id)
            router.refresh()
        })
    }

    return (
        <DropdownMenuItem 
            onClick={handleRemove}
            disabled={isPending}
            className="gap-2 focus:bg-red-500/10 focus:text-red-500 cursor-pointer text-xs font-bold text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isPending ? (
                <LuLoader className="size-3 animate-spin" />
            ) : (
                <LuTrash2 className="size-3" />
            )}
            {isPending ? "REMOVENDO..." : "REMOVER"}
        </DropdownMenuItem>
    )
}