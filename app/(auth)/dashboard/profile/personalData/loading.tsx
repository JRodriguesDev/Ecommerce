import { LuLoader } from "react-icons/lu"

const Loading = () => {
    return (
        <div className="w-full h-[60vh] flex flex-col items-center justify-center space-y-4">
            {/* O SPINNER ANIMADO */}
            <div className="relative flex items-center justify-center">
                {/* Círculo de brilho ao fundo (opcional, dá um ar moderno) */}
                <div className="absolute size-12 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
                
                {/* Ícone de Loader girando */}
                <LuLoader className="size-10 text-blue-500 animate-spin" />
            </div>

            {/* TEXTO DE STATUS */}
            <div className="flex flex-col items-center">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-zinc-200 italic animate-pulse">
                    Syncing
                </p>
                <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest mt-1">
                    Retrieving account data...
                </p>
            </div>
        </div>
    )
}

export default Loading