import { 
    LuUser, 
    LuChevronRight, 
    LuCamera,
} from "react-icons/lu"
import { FaGoogle, FaDiscord } from "react-icons/fa"

export const Avatar = ({ images }: { images: { main: string | null, google: string | null, discord: string | null } }) => {
    
    return (
        <div className="p-6 flex items-center justify-between hover:bg-zinc-800/20 transition-colors cursor-pointer group">
            <div className="flex items-center gap-6">
                {/* AVATAR PRINCIPAL */}
                <div className="relative">
                    <div className="size-16 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center overflow-hidden ring-2 ring-zinc-950 shadow-xl">
                        {images.main ? (
                            <img 
                                src={images.main} 
                                alt="Profile" 
                                className="size-full object-cover transition-transform duration-500 group-hover:scale-110" 
                            />
                        ) : (
                            <LuUser className="size-8 text-zinc-600" />
                        )}
                    </div>
                    
                    {/* INDICADOR DE EDIÇÃO */}
                    <div className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full text-white border-2 border-zinc-950 shadow-lg">
                        <LuCamera size={12} />
                    </div>
                </div>

                {/* TEXTOS E LISTA DE FONTES DISPONÍVEIS */}
                <div className="space-y-1.5">
                    <div>
                        <p className="text-xs font-bold text-zinc-200 uppercase tracking-tight">Foto de Perfil</p>
                        <p className="text-[11px] text-zinc-500">Clique para gerenciar suas imagens.</p>
                    </div>

                    {/* LISTA DE FONTES (Google/Discord) */}
                    <div className="flex items-center gap-2 pt-1">
                        {images.google && (
                            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-zinc-950 border border-zinc-800">
                                <FaGoogle size={8} className="text-blue-400" />
                                <span className="text-[9px] font-bold text-zinc-500 uppercase">Google</span>
                            </div>
                        )}
                        {images.discord && (
                            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-zinc-950 border border-zinc-800">
                                <FaDiscord size={10} className="text-[#5865F2]" />
                                <span className="text-[9px] font-bold text-zinc-500 uppercase">Discord</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Se você quiser mostrar as miniaturas reais das outras fotos antes de clicar */}
                <div className="flex -space-x-2">
                    {images.google && images.google !== images.main && (
                        <img src={images.google} className="size-6 rounded-full border-2 border-zinc-900 grayscale-[0.5] opacity-50" />
                    )}
                    {images.discord && images.discord !== images.main && (
                        <img src={images.discord} className="size-6 rounded-full border-2 border-zinc-900 grayscale-[0.5] opacity-50" />
                    )}
                </div>
                <LuChevronRight className="text-zinc-700 group-hover:text-zinc-400 group-hover:translate-x-1 transition-all" />
            </div>
        </div>
    )
}