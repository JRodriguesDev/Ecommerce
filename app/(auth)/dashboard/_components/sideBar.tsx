'use client'

import { usePathname } from 'next/navigation' // Adicionamos isso para evitar erros de hidratação
import Link from 'next/link'
import { 
    LuUser, LuPackage, LuSettings, LuCreditCard, 
    LuGem, LuHeart, LuLogOut 
} from "react-icons/lu"
import { GrCart } from "react-icons/gr";
import { Separator } from "@/components/ui/separator"
import { signOut } from "next-auth/react"
import {useCartStore} from '@/lib/zustand/cartHook'
import { useEffect } from 'react';
import {useSession} from 'next-auth/react'

const DashboardSidebar = () => {
    const pathName = usePathname() // 1. Pega a URL atual (ex: /dashboard/profile)
    const {data: session} = useSession()
    const cartCount = useCartStore()
    useEffect(() => {
        cartCount.setInitialCount(session?.user?.cartCount)
    }, [session?.user?.cartCount])

    return (
        <aside className="group fixed left-0 top-16 h-[calc(100vh-64px)] w-20 hover:w-64 bg-black border-r border-zinc-900 transition-all duration-300 ease-in-out z-40 overflow-hidden flex flex-col py-6">
            
            <div className="flex flex-col gap-1">
                <h4 className="px-7 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Menu
                </h4>
                <nav className="flex flex-col gap-1 px-3">
                    {/* 4. Comparamos o HREF com o PATHNAME atual */}
                    <SidebarItem 
                        href="/dashboard/profile" 
                        icon={<LuUser />} 
                        label="Dados Pessoais" 
                        active={pathName === "/dashboard/profile"} 
                    />
                    <SidebarItem 
                        href="/dashboard/shopping" 
                        icon={<LuPackage />} 
                        label="Compras" 
                        active={pathName === "/dashboard/shopping"} 
                    />
                    <SidebarItem 
                        href="/dashboard/cart" 
                        icon={<GrCart />} 
                        label="Carrinho" 
                        active={pathName === "/dashboard/cart"} 
                        badgeCount={cartCount.count}
                    />
                    <SidebarItem 
                        href="/dashboard/favorites" 
                        icon={<LuHeart />} 
                        label="Favoritos" 
                        active={pathName === "/dashboard/favorites"} 
                    />
                    <SidebarItem 
                        href="/profile/subscriptions" 
                        icon={<LuGem />} 
                        label="Assinaturas" 
                        active={pathName === "/profile/subscriptions"} 
                    />
                </nav>
            </div>

            <div className="my-6 px-4">
                <Separator className="bg-zinc-800/50" />
            </div>

            <nav className="flex flex-col gap-1 px-3">
                <SidebarItem 
                    href="/profile/wallet" 
                    icon={<LuCreditCard />} 
                    label="Carteira" 
                    active={pathName === "/profile/wallet"} 
                />
                <SidebarItem 
                    href="/profile/settings" 
                    icon={<LuSettings />} 
                    label="Ajustes" 
                    active={pathName === "/profile/settings"} 
                />
            </nav>

            <div className="mt-auto px-3">
                <button className="flex items-center gap-4 w-full px-4 py-3 text-red-500/70 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all overflow-hidden">
                    <LuLogOut className="size-5 shrink-0" />
                    <span onClick={() => signOut()} className="cursor-pointer text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Sair
                    </span>
                </button>
            </div>
        </aside>
    )
}

const SidebarItem = ({ 
    href, 
    icon, 
    label, 
    active = false, 
    badgeCount = 0 // Nova prop
}: { 
    href: string, 
    icon: React.ReactNode, 
    label: string, 
    active?: boolean,
    badgeCount?: number // Tipagem
}) => {
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
            {/* Adicionamos RELATIVE aqui para a bolinha se posicionar em relação ao ícone */}
            <div className="relative text-xl shrink-0">
                <span className={`${active ? 'text-blue-500' : ''}`}>
                    {icon}
                </span>
                
                {/* Só mostra se badgeCount for passado e maior que 0 */}
                {badgeCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-1 ring-black">
                        {badgeCount}
                    </span>
                )}
            </div>

            <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {label}
            </span>
        </Link>
    )
}

export default DashboardSidebar