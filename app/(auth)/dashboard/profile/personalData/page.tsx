import { LuMail, LuChevronRight } from "react-icons/lu"
import { RiFileUserLine } from "react-icons/ri"
import { Card } from "@/components/ui/card"
import { profile } from './actions'
import { ConnectionCard } from './_components/connectionCard'
import { Avatar } from './_components/avatar'
import { ImageSourceSelector } from './_components/imageSourceSelector'
import { notFound } from "next/navigation"

const PersonalData = async () => {
    // Busca os dados do perfil
    const userProfile = await profile() 

    // Faxina: Se não houver perfil (sessão expirada ou erro), redirecionamos
    if (!userProfile) return notFound()

    const providers = userProfile.accounts?.map((el) => el.provider) || []

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20 px-4 pt-4">
            
            {/* TÍTULO E INTRO */}
            <div className="space-y-1">
                <h1 className="text-3xl font-black tracking-tighter text-zinc-100 uppercase italic">
                    Dados Pessoais
                </h1>
                <p className="text-zinc-500 text-sm font-medium">
                    Gerencie as informações que identificam sua conta.
                </p>
            </div>

            <div className="grid gap-8">
                {/* SEÇÃO 1: IDENTIDADE */}
                <section className="space-y-4">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-500/80 px-1">
                        Identidade do Usuário
                    </h2>
                    <Card className="bg-zinc-900/20 border-zinc-800/50 backdrop-blur-sm divide-y divide-zinc-800/50 overflow-hidden shadow-2xl">
                        
                        {/* FOTO DE PERFIL - Wrapper interativo */}
                        <div className="p-6 flex items-center justify-between group cursor-pointer hover:bg-zinc-800/10 transition-colors">
                            <div className="flex items-center gap-6">
                                <ImageSourceSelector images={userProfile.images}>
                                    <div className="relative group/avatar">
                                        <Avatar images={userProfile.images}/>
                                        <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-[10px] font-bold text-white uppercase">Trocar</span>
                                        </div>
                                    </div>
                                </ImageSourceSelector>
                                <div>
                                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Foto de Perfil</p>
                                    <p className="text-xs text-zinc-600">Visível em todos os serviços.</p>
                                </div>
                            </div>
                            <LuChevronRight className="text-zinc-700 group-hover:text-zinc-400 group-hover:translate-x-1 transition-all" />
                        </div>

                        {/* NOME */}
                        <DataItem 
                            label="Nome de exibição" 
                            value={userProfile.name || "Não informado"}
                            icon={<RiFileUserLine size={20} />} 
                        />

                        {/* E-MAIL */}
                        <DataItem 
                            label="E-mail principal" 
                            value={userProfile.email} 
                            icon={<LuMail size={20} />} 
                        />
                    </Card>
                </section>

                {/* SEÇÃO 2: CONTAS VINCULADAS */}
                <section className="space-y-4">
                    <div className="flex flex-col gap-1 px-1">
                        <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-600">
                            Conexões de Acesso
                        </h2>
                        <p className="text-[11px] text-zinc-500">Provedores que você utiliza para entrar na conta.</p>
                    </div>
                    <ConnectionCard connectedProviders={providers}/>
                </section>
            </div>
        </div>
    )
}

// SUB-COMPONENTE PARA ITENS DE LISTA (MEMOIZADO OU REUTILIZÁVEL)
const DataItem = ({ label, value, icon }: { label: string, value?: string | null, icon: React.ReactNode }) => (
    <div className="p-6 flex items-center justify-between hover:bg-zinc-800/20 transition-all cursor-pointer group">
        <div className="flex items-center gap-5">
            <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-600 group-hover:text-blue-500 group-hover:border-blue-500/20 transition-all">
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-0.5">{label}</p>
                <p className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">{value}</p>
            </div>
        </div>
        <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity">EDITAR</span>
            <LuChevronRight className="text-zinc-700 group-hover:text-zinc-400 group-hover:translate-x-1 transition-all" />
        </div>
    </div>
)

export default PersonalData