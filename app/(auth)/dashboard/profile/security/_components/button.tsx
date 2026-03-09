'use client'

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { LuChevronRight, LuLoader } from "react-icons/lu"
import { useRouter } from "next/navigation"
import { swith2FaAction, resetPasswordAction } from '../actions' // Adicione sua action de senha
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Props } from '../types'

export const SecurityActionButton = ({ label, type, isTwoFactorEnabled }: Props) => {
    const [isPending, startTransition] = useTransition()
    const [newPassword, setNewPassword] = useState("")
    const [error, setError] = useState('')
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handle2FA = () => {
        startTransition(async () => {
            await swith2FaAction(!isTwoFactorEnabled)
            router.refresh()
        })
    }

    const handlePasswordUpdate = () => {
        startTransition(async () => {
            const result = await resetPasswordAction(newPassword)
            if (!result?.success) {
                setNewPassword("")
                setError(result!.error!)
                setOpen(false)
                return
            }
            setOpen(false) // Fecha o modal
            setNewPassword("") // Limpa o input
            router.refresh()
        })
    }

    // Se for 2FA, o clique é direto
    if (type === "2FA") {
        return (
            <div className="flex items-center gap-3" onClick={handle2FA}>
                <Button
                    variant='ghost'
                    disabled={isPending}
                    className="text-[10px] font-bold text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity uppercase"
                >
                    {isPending ? <LuLoader className="animate-spin" size={14} /> : label}
                </Button>
                <LuChevronRight className="text-zinc-700 group-hover:text-zinc-400 group-hover:translate-x-1 transition-all" />
            </div>
        )
    }

    // Se for PASSWORD, envolvemos em um Dialog
    return (
        <Dialog open={open} onOpenChange={(val) => {
            setOpen(val)
            if (!val) {
                setError('')
                setNewPassword('')
            }
        }}>
            <DialogTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer group">
                    <Button
                        variant='ghost'
                        className="text-[10px] font-bold text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity uppercase"
                    >
                        {label}
                    </Button>
                    <LuChevronRight className="text-zinc-700 group-hover:text-zinc-400 group-hover:translate-x-1 transition-all" />
                </div>
            </DialogTrigger>
            <DialogContent className="bg-zinc-950 border-zinc-800 text-zinc-100">
                <DialogHeader>
                    <DialogTitle className="text-xl font-black uppercase italic tracking-tighter">
                        Alterar Senha
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Nova Senha</label>
                        <Input
                            type="password"
                            value={newPassword}
                            disabled={isPending}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Digite sua nova senha"
                            className="bg-zinc-900/50 border-zinc-800 focus:border-blue-500 transition-all text-zinc-200"
                        />
                        {error && <p className="text-[10px] text-red-500 font-bold uppercase tracking-tighter">{error}</p>}
                    </div>
                    <Button
                        onClick={handlePasswordUpdate}
                        disabled={isPending}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase text-[11px] tracking-widest"
                    >
                        {isPending ? <LuLoader className="animate-spin" /> : "Confirmar Alteração"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}