import { 
    LuMail, 
    LuChevronRight, 
} from "react-icons/lu"

import { RiFileUserLine } from "react-icons/ri";
import { Card } from "@/components/ui/card"
import {profile} from './actions'
import {ConnectionCard} from './_components/connectionCard'
import {Avatar} from './_components/avatar'

const PersonalData = async () => {
    const userProfile = await profile() 
    const providers = userProfile!.accounts!.map((el) => el.provider)
    console.log(userProfile)

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20 px-4">
            
            {/* TÍTULO E INTRO */}
            <div className="mt-4">
                <h1 className="text-3xl font-black tracking-tighter text-zinc-100 uppercase italic">Dados Pessoais</h1>
                <p className="text-zinc-500 text-sm font-medium">Informações que identificam você e sua conta no sistema.</p>
            </div>

            {/* SEÇÃO 1: IDENTIDADE */}
            <section className="space-y-3">
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 px-1">Identidade</h2>
                <Card className="bg-zinc-900/20 border-zinc-800 divide-y divide-zinc-800/50 overflow-hidden">
                    
                    {/* FOTO DE PERFIL */}
                    <Avatar images={userProfile!.images}/>

                    {/* NOME */}
                    <DataItem 
                        label="Nome de exibição" 
                        value={userProfile?.name}
                        icon={<RiFileUserLine size={18} />} 
                    />

                    {/* E-MAIL */}
                    <DataItem 
                        label="E-mail principal" 
                        value={userProfile?.email} 
                        icon={<LuMail size={18} />} 
                    />
                </Card>
            </section>

            {/* SEÇÃO 2: CONTAS VINCULADAS */}
            <section className="space-y-3">
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 px-1">Conexões de Acesso</h2>
                <ConnectionCard connectedProviders={providers}/>
            </section>
        </div>
    )
}

// SUB-COMPONENTE PARA ITENS DE LISTA
const DataItem = ({ label, value, icon}: any) => (
    <div className="p-6 flex items-center justify-between hover:bg-zinc-800/20 transition-colors cursor-pointer group">
        <div className="flex items-center gap-4">
            <div className="text-zinc-600 group-hover:text-blue-500 transition-colors">
                {icon}
            </div>
            <div>
                <div className="flex items-center gap-2">
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">{label}</p>
                </div>
                <p className="text-sm font-bold text-zinc-200">{value}</p>
            </div>
        </div>
        <LuChevronRight className="text-zinc-700 group-hover:text-zinc-400 group-hover:translate-x-1 transition-all" />
    </div>
)

export default PersonalData