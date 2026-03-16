'use client'

import { usePathname } from 'next/navigation' // Adicionamos isso para evitar erros de hidratação
import {
    LuUser, LuPackage,
    LuGem, LuHeart, LuLogOut
} from "react-icons/lu"
import { GrCart } from "react-icons/gr";
import { signOut } from "next-auth/react"
import { useCartStore } from '@/lib/zustand/cartHook'
import { useEffect } from 'react';
import { useSession } from 'next-auth/react'
import { SidebarItem } from './sideBarItem'

const DashboardSidebar = () => {
    const pathName = usePathname() // 1. Pega a URL atual (ex: /dashboard/profile)
    const { data: session } = useSession()
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
                        label="Personal Data"
                        active={pathName.startsWith("/dashboard/profile")}
                    />
                    <SidebarItem
                        href="/dashboard/orders"
                        icon={<LuPackage />}
                        label="Shopping"
                        active={pathName === "/dashboard/orders"}
                    />
                    <SidebarItem
                        href="/dashboard/cart"
                        icon={<GrCart />}
                        label="Cart"
                        active={pathName === "/dashboard/cart"}
                        badgeCount={cartCount.count}
                    />
                    <SidebarItem
                        href="/dashboard/favorites"
                        icon={<LuHeart />}
                        label="Favorites"
                        active={pathName === "/dashboard/favorites"}
                    />
                    <SidebarItem
                        href="/dashboard/subscriptions"
                        icon={<LuGem />}
                        label="Signatures"
                        active={pathName === "/dashboard/subscriptions"}
                    />
                </nav>
            </div>

            <div className="mt-auto px-3">
                <button className="flex items-center gap-4 w-full px-4 py-3 text-red-500/70 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all overflow-hidden">
                    <LuLogOut className="size-5 shrink-0" />
                    <span onClick={() => signOut()} className="cursor-pointer text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        To go out
                    </span>
                </button>
            </div>
        </aside>
    )
}



export default DashboardSidebar