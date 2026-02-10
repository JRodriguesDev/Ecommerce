import { LuMailCheck, LuArrowLeft } from "react-icons/lu"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const VerifyRequestPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-900 p-8 rounded-2xl shadow-2xl text-center space-y-6">
        
        {/* Ícone com Pulse Effect */}
        <div className="relative inline-flex mb-2">
          <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping" />
          <div className="relative bg-blue-500/10 p-4 rounded-full">
            <LuMailCheck className="text-blue-500" size={40} />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Verifique seu e-mail
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Enviamos um link de login seguro para o seu endereço de e-mail. 
            Clique no botão contido na mensagem para acessar sua conta.
          </p>
        </div>

        <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50">
          <p className="text-xs text-zinc-500">
            Não recebeu? Verifique a pasta de **Spam** ou aguarde alguns minutos.
          </p>
        </div>

        <Link href="/auth/login" className="block w-full">
          <Button variant="ghost" className="w-full text-zinc-400 hover:text-white flex gap-2">
            <LuArrowLeft size={16} />
            Voltar para o login
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default VerifyRequestPage