import { LuShieldCheck } from "react-icons/lu"

const Loading = () => {
    return (
        <div className="w-full h-[60vh] flex flex-col items-center justify-center space-y-6">
            {/* O SPINNER ANIMADO COM ÍCONE DE ESCUDO */}
            <div className="relative flex items-center justify-center">
                {/* Brilho de fundo focado em segurança (Cyan/Emerald dá um ar de proteção) */}
                <div className="absolute size-14 bg-cyan-500/20 blur-2xl rounded-full animate-pulse" />

                {/* Ícone de Escudo que pulsa enquanto o círculo gira */}
                <div className="relative">
                    <LuShieldCheck className="size-10 text-cyan-500 animate-pulse" />
                    {/* Borda giratória sutil ao redor do escudo */}
                    <div className="absolute inset-0 size-10 border-2 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
                </div>
            </div>

            {/* TEXTO DE STATUS DE SEGURANÇA */}
            <div className="flex flex-col items-center text-center">
                <p className="text-xs font-black uppercase tracking-[0.4em] text-zinc-100 italic animate-pulse">
                    Segurança
                </p>
                <div className="h-[1px] w-8 bg-zinc-700 my-2" />
                <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-[0.2em]">
                    Buscando dados de segurança...
                </p>
            </div>

            {/* Barra de progresso fake (opcional, mas fica bem visual) */}
            <div className="w-32 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
                <div className="w-full h-full bg-cyan-500/50 animate-progress origin-left" />
            </div>
        </div>
    )
}

export default Loading