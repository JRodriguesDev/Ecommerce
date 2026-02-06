'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
    LuUser, LuPackage, LuSettings, LuCreditCard, 
    LuShieldCheck, LuStore, LuGem, LuHeart, LuLogOut 
} from "react-icons/lu"
import { Separator } from "@/components/ui/separator"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"

const DashboardSidebar = () => {
    const pathName = usePathname()

    return (
        <aside className="group fixed left-0 top-16 h-[calc(100vh-64px)] w-20 hover:w-64 bg-black border-r border-zinc-900 transition-all duration-300 ease-in-out z-40 overflow-hidden flex flex-col py-6">
            
            {/* SEÇÃO: MENU PRINCIPAL */}
            <div className="flex flex-col gap-1">
                <h4 className="px-7 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Menu
                </h4>
                <nav className="flex flex-col gap-1 px-3">
                    <SidebarItem 
                        href="/dashboard/profile" 
                        icon={<LuUser />} 
                        label="Dados Pessoais" 
                        active={pathName === "/dashboard/profile"} 
                    />
                    <SidebarItem 
                        href="/dashboard/shopping" 
                        icon={<LuPackage />} 
                        label="Minhas Compras" 
                        active={pathName === "/dashboard/shopping"} 
                    />
                    <SidebarItem 
                        href="/dashboard/favorites" 
                        icon={<LuHeart />} 
                        label="Favoritos" 
                        active={pathName === "/dashboard/favorites"} 
                    />
                </nav>
            </div>

            <div className="my-6 px-4">
                <Separator className="bg-zinc-800/50" />
            </div>

            {/* SEÇÃO: VENDAS (Padronizado para /dashboard/...) */}
            <div className="flex flex-col gap-1">
                <h4 className="px-7 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Negócios
                </h4>
                <nav className="flex flex-col gap-1 px-3">
                    <SidebarItem 
                        href="/dashboard/sales" 
                        icon={<LuStore />} 
                        label="Minha Loja" 
                        active={pathName === "/dashboard/sales"} 
                    />
                    <SidebarItem 
                        href="/dashboard/subscriptions" 
                        icon={<LuGem />} 
                        label="Assinaturas" 
                        active={pathName === "/dashboard/subscriptions"} 
                    />
                </nav>
            </div>

            <div className="my-6 px-4">
                <Separator className="bg-zinc-800/50" />
            </div>

            {/* SEÇÃO: CONFIGS */}
            <nav className="flex flex-col gap-1 px-3">
                <SidebarItem 
                    href="/dashboard/wallet" 
                    icon={<LuCreditCard />} 
                    label="Carteira" 
                    active={pathName === "/dashboard/wallet"} 
                />
                <SidebarItem 
                    href="/dashboard/security" 
                    icon={<LuShieldCheck />} 
                    label="Segurança" 
                    active={pathName === "/dashboard/security"} 
                />
                <SidebarItem 
                    href="/dashboard/settings" 
                    icon={<LuSettings />} 
                    label="Ajustes" 
                    active={pathName === "/dashboard/settings"} 
                />
            </nav>

            {/* BOTÃO SAIR: Fixado no rodapé da sidebar */}
            <div className="mt-auto px-3">
                <button 
                    onClick={() => signOut()}
                    className="flex items-center gap-4 w-full px-4 py-3 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all duration-200 overflow-hidden group/logout"
                >
                    <LuLogOut className="size-5 shrink-0 transition-transform group-hover/logout:-translate-x-1" />
                    <span className="text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Encerrar Sessão
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
            className={cn(
                "group/item flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 overflow-hidden relative",
                active 
                    ? 'bg-zinc-900 text-white font-bold' 
                    : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/40'
            )}
        >
            {/* Indicador lateral no estado ativo */}
            {active && (
                <div className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full" />
            )}

            <span className={cn(
                "text-xl shrink-0 transition-colors",
                active ? 'text-blue-500' : 'group-hover/item:text-zinc-300'
            )}>
                {icon}
            </span>
            
            <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {label}
            </span>
        </Link>
    )
}

export default DashboardSidebar