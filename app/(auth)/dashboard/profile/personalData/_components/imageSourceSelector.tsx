'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FaGoogle, FaDiscord } from "react-icons/fa"
import { LuCamera, LuCheck } from "react-icons/lu"
import { cn } from "@/lib/utils"
import {useSession} from 'next-auth/react'

interface Props {
  children: React.ReactNode
  images: { main: string | null; google: string | null; discord: string | null }
}

export const ImageSourceSelector = ({ children, images }: Props) => {
  const [open, setOpen] = useState(false)
  const {update} = useSession()
  const router = useRouter()

  const handleSelect = async (url: string) => {
    await update({image: url})
    router.refresh()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[420px] bg-zinc-950 border-zinc-800 text-zinc-100 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-left text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">
            Origem da Imagem
          </DialogTitle>
          <p className="text-zinc-400 text-sm font-medium mt-1">Selecione qual avatar você deseja exibir no seu perfil.</p>
        </DialogHeader>

        <div className="grid gap-2 p-6">
          {/* OPÇÃO GOOGLE */}
          {images.google && (
            <SourceOption 
              label="Google Account"
              sublabel="Sincronizado via Google Auth"
              image={images.google}
              icon={<FaGoogle size={10} className="text-blue-500" />}
              isActive={images.main === images.google}
              onClick={() => handleSelect(images.google!, 'google')}
              accentColor="hover:border-blue-500/40 hover:bg-blue-500/5"
            />
          )}

          {/* OPÇÃO DISCORD */}
          {images.discord && (
            <SourceOption 
              label="Discord Profile"
              sublabel="Sincronizado via Discord App"
              image={images.discord}
              icon={<FaDiscord size={10} className="text-[#5865F2]" />}
              isActive={images.main === images.discord}
              onClick={() => handleSelect(images.discord!, 'discord')}
              accentColor="hover:border-[#5865F2]/40 hover:bg-[#5865F2]/5"
            />
          )}

        </div>
      </DialogContent>
    </Dialog>
  )
}

// SUB-COMPONENTE PARA LIMPEZA DO CÓDIGO
const SourceOption = ({ label, sublabel, image, icon, isActive, onClick, accentColor }: any) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 group relative overflow-hidden",
        isActive 
          ? "bg-zinc-900 border-zinc-700" 
          : cn("bg-zinc-900/40 border-zinc-800", accentColor)
      )}
    >
      <div className="relative size-12 shrink-0">
        <img src={image} className={cn("size-full rounded-full object-cover border-2 transition-all", isActive ? "border-blue-500" : "border-zinc-800")} alt={label} />
        <div className="absolute -bottom-1 -right-1 bg-zinc-950 p-1.5 rounded-full border border-zinc-800 shadow-xl">
          {icon}
        </div>
      </div>
      
      <div className="text-left flex-1">
        <p className={cn("text-sm font-bold transition-colors", isActive ? "text-white" : "text-zinc-300")}>{label}</p>
        <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">{sublabel}</p>
      </div>

      {isActive && (
        <div className="bg-blue-500/10 text-blue-500 p-1.5 rounded-full border border-blue-500/20">
          <LuCheck size={14} strokeWidth={3} />
        </div>
      )}
    </button>
  )
}