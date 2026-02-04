import { Card } from "@/components/ui/card"
import { FaGoogle, FaDiscord } from "react-icons/fa";

// 1. Definimos as configurações de cada provider disponível
const SUPPORTED_PROVIDERS = [
    {
        id: "google",
        name: "Google",
        icon: <FaGoogle size={20} />,
        color: "group-hover:text-blue-400"
    },
    {
        id: "discord",
        name: "Discord",
        icon: <FaDiscord size={20} />,
        color: "group-hover:text-[#5865F2]" // Cor oficial do Discord
    }
]

export const ConnectionCard = ({ connectedProviders }: { connectedProviders: string[] }) => {
    return (
        <Card className="bg-zinc-900/20 border-zinc-800 divide-y divide-zinc-800/50 overflow-hidden">
            {SUPPORTED_PROVIDERS.map((provider) => {
                // 2. Verificamos se este provider específico está no array que veio do banco
                const isConnected = connectedProviders.includes(provider.id);

                return (
                    <div 
                        key={provider.id} 
                        className="p-6 flex items-center justify-between hover:bg-zinc-800/20 transition-colors cursor-pointer group"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`size-10 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400 transition-colors ${provider.color}`}>
                                {provider.icon}
                            </div>
                            <div>
                                <p className="text-xs font-bold text-zinc-200">{provider.name}</p>
                                <p className={`text-[11px] italic ${isConnected ? 'text-emerald-500/70' : 'text-zinc-500'}`}>
                                    {isConnected ? 'Conectado' : 'Não conectado'}
                                </p>
                            </div>
                        </div>

                        {/* 3. O botão muda de cor e texto dependendo do estado */}
                        <button className={`text-[10px] font-black uppercase transition-all hover:underline ${
                            isConnected ? 'text-zinc-500 hover:text-red-500' : 'text-blue-500'
                        }`}>
                            {isConnected ? 'Desvincular' : 'Conectar'}
                        </button>
                    </div>
                );
            })}
        </Card>
    )
}