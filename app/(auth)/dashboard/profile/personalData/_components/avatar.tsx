import { 
    LuUser, 
    LuChevronRight, 
    LuCamera,
} from "react-icons/lu"
import { FaGoogle, FaDiscord } from "react-icons/fa"
import Image from "next/image";
import {AvatarProps} from '../types'

export const Avatar = ({ images }: AvatarProps) => {
    
    return (
        <div className="p-6 flex items-center justify-between hover:bg-zinc-800/10 transition-all cursor-pointer group select-none">
            <div className="flex items-center gap-6">
                {/* CONTAINER DO AVATAR PRINCIPAL */}
                <div className="relative">
                    <div className="size-20 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden ring-4 ring-zinc-950 shadow-2xl transition-transform duration-300 group-hover:scale-105">
                        {images.main ? (
                            <Image 
                                src={images.main}
                                alt="Profile" 
                                fill
                                className="size-full object-cover transition-transform duration-700 group-hover:scale-110" 
                            />
                        ) : (
                            <LuUser className="size-10 text-zinc-700" />
                        )}
                        
                        {/* Overlay sutil no hover */}
                        <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    {/* INDICADOR DE EDIÇÃO (Crachá) */}
                    <div className="absolute -bottom-1 -right-1 p-2 bg-blue-600 rounded-lg text-white border-4 border-zinc-950 shadow-xl group-hover:bg-blue-500 transition-colors">
                        <LuCamera size={14} />
                    </div>
                </div>

                {/* TEXTOS E FONTES */}
                <div className="space-y-2">
                    <div>
                        <p className="text-sm font-black text-zinc-100 uppercase tracking-tighter italic">Sua Identidade Visual</p>
                        <p className="text-[11px] text-zinc-500 font-medium">Gerencie as fontes da sua imagem de perfil.</p>
                    </div>

                    {/* BADGES DE CONEXÃO */}
                    <div className="flex items-center gap-2">
                        {images.google && (
                            <SourceBadge icon={<FaGoogle size={8} />} label="Google" color="text-blue-400" />
                        )}
                        {images.discord && (
                            <SourceBadge icon={<FaDiscord size={10} />} label="Discord" color="text-[#5865F2]" />
                        )}
                    </div>
                </div>
            </div>

            {/* LADO DIREITO: MINIATURAS E CHEVRON */}
            <div className="flex items-center gap-5">
                <div className="hidden sm:flex -space-x-3 transition-all group-hover:-space-x-1">
                    {/* Mostra as opções que NÃO são a principal */}
                    {Object.entries(images).map(([key, src]) => (
                        src && src !== images.main && (
                            <div key={key} className="size-8 rounded-full border-2 border-zinc-950 overflow-hidden bg-zinc-900 ring-1 ring-zinc-800 shadow-lg">
                                <img src={src} className="size-full object-cover grayscale group-hover:grayscale-0 transition-all opacity-40 group-hover:opacity-100" />
                            </div>
                        )
                    ))}
                </div>
                
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-zinc-700 opacity-0 group-hover:opacity-100 transition-all uppercase tracking-widest">Ajustar</span>
                    <LuChevronRight className="text-zinc-700 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </div>
            </div>
        </div>
    )
}

// Pequeno sub-componente interno para as badges de fonte
const SourceBadge = ({ icon, label, color }: { icon: React.ReactNode, label: string, color: string }) => (
    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-zinc-950 border border-zinc-800/50">
        <span className={color}>{icon}</span>
        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-wider">{label}</span>
    </div>
)