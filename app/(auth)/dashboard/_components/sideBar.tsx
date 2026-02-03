import Link from 'next/link'
import { 
    LuUser, 
    LuPackage, 
    LuSettings, 
    LuCreditCard, 
    LuShieldCheck, 
    LuStore, 
    LuGem,
    LuHeart,
    LuLogOut
} from "react-icons/lu"
import { Separator } from "@/components/ui/separator"

const DashboardSidebar = () => {
    return (
        /* O segredo está aqui: w-20 que expande para w-64 no hover */
        <aside className="group fixed left-0 top-16 h-[calc(100vh-64px)] w-20 hover:w-64 bg-black border-r border-zinc-900 transition-all duration-300 ease-in-out z-40 overflow-hidden flex flex-col py-6">
            
            {/* SEÇÃO: PERFIL */}
            <div className="flex flex-col gap-1">
                <h4 className="px-7 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Menu
                </h4>
                <nav className="flex flex-col gap-1 px-3">
                    <SidebarItem href="/profile" icon={<LuUser />} label="Dados Pessoais" active />
                    <SidebarItem href="/profile/orders" icon={<LuPackage />} label="Compras" />
                    <SidebarItem href="/profile/favorites" icon={<LuHeart />} label="Favoritos" />
                </nav>
            </div>

            <div className="my-6 px-4">
                <Separator className="bg-zinc-800/50" />
            </div>

            {/* SEÇÃO: NEGÓCIOS */}
            <div className="flex flex-col gap-1">
                <h4 className="px-7 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Vendas
                </h4>
                <nav className="flex flex-col gap-1 px-3">
                    <SidebarItem href="/profile/sales" icon={<LuStore />} label="Minha Loja" />
                    <SidebarItem href="/profile/subscriptions" icon={<LuGem />} label="Assinaturas" />
                </nav>
            </div>

            <div className="my-6 px-4">
                <Separator className="bg-zinc-800/50" />
            </div>

            {/* SEÇÃO: CONFIGS */}
            <nav className="flex flex-col gap-1 px-3">
                <SidebarItem href="/profile/wallet" icon={<LuCreditCard />} label="Carteira" />
                <SidebarItem href="/profile/security" icon={<LuShieldCheck />} label="Segurança" />
                <SidebarItem href="/profile/settings" icon={<LuSettings />} label="Ajustes" />
            </nav>

            {/* SAIR */}
            <div className="mt-auto px-3">
                 <button className="flex items-center gap-4 w-full px-4 py-3 text-red-500/70 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all overflow-hidden">
                    <LuLogOut className="size-5 shrink-0" />
                    <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Sair
                    </span>
                </button>
            </div>
        </aside>
    )
}

const SidebarItem = ({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) => {
    return (
        <Link 
            href={href}
            className={`
                flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 overflow-hidden
                ${active 
                    ? 'bg-zinc-900 text-white font-semibold' 
                    : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50'}
            `}
        >
            {/* O shrink-0 impede que o ícone mude de tamanho na animação */}
            <span className={`text-xl shrink-0 ${active ? 'text-blue-500' : ''}`}>
                {icon}
            </span>
            
            {/* O texto aparece e some conforme o hover da Sidebar (pai) */}
            <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {label}
            </span>
        </Link>
    )
}

export default DashboardSidebar