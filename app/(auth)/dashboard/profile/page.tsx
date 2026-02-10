import Link from 'next/link'
import { 
    LuUser, 
    LuShieldCheck, 
    LuCreditCard, 
    LuHistory, 
    LuArrowRight,
    LuFileText
} from "react-icons/lu"
import { Card, CardContent } from "@/components/ui/card"
import PerfilInfo from './_components/perfilnfo'
import { cn } from '@/lib/utils'

const Profile = async () => {
    return (
        /* ml-20 garante que o conteúdo não fique por baixo da sidebar retraída */
        <div className="max-w-6xl mx-auto space-y-10 pb-20 px-6 pt-8">
            
            {/* 1. HEADER DE IDENTIFICAÇÃO */}
            <PerfilInfo />

            <div className="space-y-6">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-black text-zinc-100 tracking-tighter italic">CENTRAL DA CONTA</h2>
                    <p className="text-zinc-500 text-sm">Gerencie suas preferências e histórico de navegação.</p>
                </div>

                {/* 2. GRID DE NAVEGAÇÃO */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    
                    <ProfileMenuCard 
                        href="/dashboard/profile/personalData"
                        icon={<LuUser />}
                        title="Dados Pessoais"
                        description="Edite seu nome, e-mail e informações de contato básicas."
                    />

                    <ProfileMenuCard 
                        href="/dashboard/profile/security"
                        icon={<LuShieldCheck />}
                        title="Segurança"
                        description="Gerencie sua senha e autenticação de dois fatores."
                    />

                    <ProfileMenuCard 
                        href="/dashboard/wallet"
                        icon={<LuCreditCard />}
                        title="Faturas e Carteira"
                        description="Veja seu saldo, histórico financeiro e métodos de pagamento."
                    />

                    <ProfileMenuCard 
                        href="/dashboard/shopping"
                        icon={<LuHistory />}
                        title="Meus Pedidos"
                        description="Acompanhe suas compras e histórico de pedidos realizados."
                    />

                    <ProfileMenuCard 
                        href="/dashboard/docs"
                        icon={<LuFileText />}
                        title="Documentos"
                        description="Acesse notas fiscais e termos de uso aceitos na plataforma."
                    />
                </div>
            </div>
        </div>
    )
}

// COMPONENTE DE CARD DE NAVEGAÇÃO
const ProfileMenuCard = ({ href, icon, title, description }: { href: string, icon: React.ReactNode, title: string, description: string }) => {
    return (
        <Link href={href} className="group outline-none">
            <Card className="h-full bg-zinc-900/20 border-zinc-800/50 backdrop-blur-sm transition-all duration-300 group-hover:bg-zinc-900/40 group-hover:border-blue-500/30 group-hover:translate-y-[-4px] group-focus:ring-2 group-focus:ring-blue-500/50 shadow-lg overflow-hidden relative">
                
                {/* Efeito de Gradiente sutil no hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <CardContent className="p-6 flex flex-col h-full relative z-10">
                    <div className="flex items-start justify-between mb-6">
                        <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-zinc-500 group-hover:text-blue-500 group-hover:border-blue-500/20 group-hover:scale-110 transition-all duration-300">
                            <span className="text-2xl">{icon}</span>
                        </div>
                        <LuArrowRight className="size-5 text-zinc-800 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                    
                    <div className="space-y-2">
                        <h3 className="font-bold text-zinc-100 tracking-tight group-hover:text-white transition-colors">
                            {title}
                        </h3>
                        <p className="text-[13px] text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
                            {description}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

export default Profile