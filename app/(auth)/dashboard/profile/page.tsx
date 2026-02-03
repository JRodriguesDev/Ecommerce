import Link from 'next/link'
import { 
    LuUser, 
    LuShieldCheck, 
    LuCreditCard, 
    LuHistory, 
    LuMapPin,
    LuArrowRight,
    LuCamera,
    LuFileText
} from "react-icons/lu"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const Profile = async () => {
    return (
        <div className="max-w-5xl mx-auto space-y-12 pb-20 px-6">
            
            {/* 1. HEADER DE IDENTIFICAÇÃO */}
            <header className="flex flex-col md:flex-row items-center gap-6 mt-6">
                <div className="relative">
                    <Avatar className="size-28 border-2 border-zinc-800">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback className="bg-zinc-900 text-2xl font-bold">JS</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 p-2 bg-blue-600 rounded-full border-4 border-black">
                        <LuCamera className="size-3 text-white" />
                    </div>
                </div>
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-black tracking-tighter text-zinc-100 uppercase">João Silva</h1>
                    <p className="text-zinc-500 text-sm font-medium">Conta verificada · Membro desde 2026</p>
                </div>
            </header>

            {/* 2. GRID DE NAVEGAÇÃO (CADA CARD É UM LINK) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                
                <ProfileMenuCard 
                    href="/profile/personal-data"
                    icon={<LuUser />}
                    title="Dados Pessoais"
                    description="Edite seu nome, e-mail e informações de contato."
                />

                <ProfileMenuCard 
                    href="/profile/security"
                    icon={<LuShieldCheck />}
                    title="Segurança"
                    description="Gerencie sua senha e autenticação de dois fatores."
                />

                <ProfileMenuCard 
                    href="/profile/billing"
                    icon={<LuCreditCard />}
                    title="Faturas e Pagamentos"
                    description="Veja seu histórico financeiro e métodos de pagamento."
                />

                <ProfileMenuCard 
                    href="/profile/orders"
                    icon={<LuHistory />}
                    title="Meus Pedidos"
                    description="Acompanhe suas compras e histórico de pedidos."
                />


                <ProfileMenuCard 
                    href="/profile/docs"
                    icon={<LuFileText />}
                    title="Documentos"
                    description="Acesse notas fiscais e termos de uso aceitos."
                />

            </div>
        </div>
    )
}

// COMPONENTE DE CARD DE NAVEGAÇÃO
const ProfileMenuCard = ({ href, icon, title, description }: { href: string, icon: React.ReactNode, title: string, description: string }) => {
    return (
        <Link href={href} className="group">
            <Card className="h-full bg-zinc-900/40 border-zinc-800 transition-all duration-300 group-hover:bg-zinc-900 group-hover:border-zinc-700 group-hover:translate-y-[-4px] shadow-lg">
                <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-400 group-hover:text-blue-500 group-hover:border-blue-500/30 transition-colors">
                            <span className="text-2xl">{icon}</span>
                        </div>
                        <LuArrowRight className="size-4 text-zinc-700 group-hover:text-zinc-100 group-hover:translate-x-1 transition-all" />
                    </div>
                    
                    <div className="space-y-2">
                        <h3 className="font-bold text-zinc-100 tracking-tight">{title}</h3>
                        <p className="text-xs text-zinc-500 leading-relaxed">
                            {description}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

export default Profile