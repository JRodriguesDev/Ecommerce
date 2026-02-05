'use client'

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog" // Componentes do Shadcn
import { FaGoogle, FaDiscord } from "react-icons/fa"
import { LuCamera } from "react-icons/lu"

interface Props {
  children: React.ReactNode
  images: { main: string | null; google: string | null; discord: string | null }
}

export function ImageSourceSelector({ children, images }: Props) {
  const [open, setOpen] = useState(false)

  // Função apenas para simular o clique por enquanto
  const handleSelect = (type: 'google' | 'discord') => {
    console.log("Selecionou a fonte:", type)
    setOpen(false) // Fecha o modal após clicar
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* O DialogTrigger faz com que o que estiver dentro dele abra o modal ao clicar */}
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[400px] bg-zinc-950 border-zinc-800 text-zinc-100 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 pt-2">
            Escolher origem da foto
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-3 py-6">
          {/* OPÇÃO GOOGLE */}
          {images.google && (
            <button
              onClick={() => handleSelect('google')}
              className="flex items-center gap-4 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all group"
            >
              <div className="relative size-12 shadow-lg">
                <img src={images.google} className="size-full rounded-full object-cover border-2 border-zinc-800" alt="Google" />
                <div className="absolute -bottom-1 -right-1 bg-zinc-950 p-1 rounded-full border border-zinc-800">
                  <FaGoogle size={10} className="text-blue-500" />
                </div>
              </div>
              <div className="text-left flex-1">
                <p className="text-sm font-bold text-zinc-200">Google Account</p>
                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">Usar foto do Google</p>
              </div>
            </button>
          )}

          {/* OPÇÃO DISCORD */}
          {images.discord && (
            <button
              onClick={() => handleSelect('discord')}
              className="flex items-center gap-4 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800 hover:border-[#5865F2]/40 hover:bg-[#5865F2]/5 transition-all group"
            >
              <div className="relative size-12 shadow-lg">
                <img src={images.discord} className="size-full rounded-full object-cover border-2 border-zinc-800" alt="Discord" />
                <div className="absolute -bottom-1 -right-1 bg-zinc-950 p-1 rounded-full border border-zinc-800">
                  <FaDiscord size={10} className="text-[#5865F2]" />
                </div>
              </div>
              <div className="text-left flex-1">
                <p className="text-sm font-bold text-zinc-200">Discord Profile</p>
                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">Usar foto do Discord</p>
              </div>
            </button>
          )}

          {/* FUTURA OPÇÃO DE UPLOAD (Vazio por enquanto) */}
          <button className="flex items-center gap-4 p-3 rounded-xl bg-zinc-900/20 border border-dashed border-zinc-800 hover:border-zinc-600 transition-all opacity-60">
            <div className="size-12 rounded-full bg-zinc-900 flex items-center justify-center border-2 border-zinc-800">
              <LuCamera className="text-zinc-600" size={20} />
            </div>
            <div className="text-left flex-1">
              <p className="text-sm font-bold text-zinc-500 italic">Em breve: Upload</p>
            </div>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}