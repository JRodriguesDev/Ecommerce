'use client'
// 1. Next.js & Auth
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { useEffect } from "react"
import {useCartStore} from '@/lib/zustand/cartHook'


// 2. Icons
import { FaUserCircle, FaShoppingCart } from "react-icons/fa"
import { TiStarFullOutline } from "react-icons/ti"
import { LuCrown, LuZap } from "react-icons/lu"

// 3. UI Components (Shadcn)
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const AuthNav = () => {
    const { status, data: session} = useSession()
    const cartStore = useCartStore()
    useEffect(() => {
        cartStore.setInitialCount(session?.user?.cartCount)
    }, [status])

    // 1. Tratamento de Loading para evitar Layout Shift
    if (status === 'loading') {
        return (
            <div className="flex items-center gap-4">
                <div className="h-8 w-20 bg-zinc-900 animate-pulse rounded-md" />
                <div className="h-9 w-9 bg-zinc-900 animate-pulse rounded-full" />
            </div>
        )
    }

    return (
        <nav className="flex items-center gap-4">
            {status === 'authenticated' ? (
                <>
                    {/* Favoritos e Carrinho - Use Link para melhor SEO/Performance se forem páginas */}
                    <Link href="/subscription" className="group relative">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-yellow-500/50 transition-all duration-300">
                            <div className="size-5 rounded-full bg-yellow-500/10 flex items-center justify-center">
                                <LuCrown className="size-3 text-yellow-500 group-hover:scale-110 transition-transform" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-tighter text-zinc-400 group-hover:text-yellow-500 transition-colors">
                                Upgrade
                            </span>
                            {/* Pequena Badge de Destaque */}
                            <Badge className="absolute -top-2 -right-2 h-4 px-1 bg-yellow-500 text-black text-[8px] font-black border-none animate-pulse">
                                VIP
                            </Badge>
                        </div>
                    </Link>
                    <Link href="/dashboard/favorites" className="flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-all group">
                        <TiStarFullOutline className="text-yellow-500 group-hover:scale-110 transition-transform" size={20}/> 
                        <span className="hidden lg:inline text-sm font-medium">Favorites</span>
                    </Link>

                    <Link 
                    href="/dashboard/cart" 
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-all group relative"
                    >
                    {/* Container do Ícone + Badge */}
                    <div className="relative">
                        <FaShoppingCart 
                        className="group-hover:scale-110 transition-transform" 
                        size={20}
                        />
                        
                        {/* Bolinha de Notificação (Badge) */}
                        {cartStore.count > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-black animate-in zoom-in duration-300">
                            {cartStore.count}
                        </span>
                        )}
                    </div>

                    {/* Texto do Link */}
                    <span className="hidden lg:inline text-sm font-medium">Cart</span>
                    </Link>

                    <DropdownMenu>
                        <DropdownMenuTrigger className="focus:outline-none outline-none group cursor-pointer shrink-0">
                            <Avatar className="h-9 w-9 border border-zinc-800 transition-all group-hover:border-zinc-700">
                                <AvatarImage 
                                    src={session?.user?.image || ""} 
                                    alt={session?.user?.name || "User"} 
                                />
                                <AvatarFallback className="bg-zinc-900 text-zinc-400">
                                    <FaUserCircle size={24} />
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent 
                            align="end" 
                            className="w-[200px] bg-zinc-950/95 backdrop-blur-md border-zinc-800 p-2 shadow-2xl z-[60]"
                        >
                            <DropdownMenuLabel className="text-[10px] font-bold text-zinc-500 px-2 py-1.5 uppercase tracking-[0.2em]">
                                Account
                            </DropdownMenuLabel>
                            
                            <DropdownMenuItem asChild>
                                <Link 
                                    href="/dashboard/profile" 
                                    className="w-full flex px-2 py-2 text-sm text-zinc-300 hover:text-white focus:bg-zinc-900 focus:text-white rounded-md transition-colors cursor-pointer"
                                >
                                    My Profile
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator className="bg-zinc-800 my-1" />

                            <DropdownMenuItem 
                                onClick={() => signOut({ callbackUrl: '/shop' })}
                                className="w-full px-2 py-2 text-sm text-red-400 hover:text-red-300 focus:bg-red-950/30 focus:text-red-300 rounded-md transition-colors cursor-pointer flex items-center gap-2 font-medium"
                            >
                                Sign Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            ) : (
                <div className="flex items-center gap-2">
                    <Link href='/auth/login'>
                        <Button variant="ghost" className="text-zinc-400 hover:text-white font-medium">
                            Sign In
                        </Button>
                    </Link>
                    <Link href='/auth/register'>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg shadow-blue-900/20">
                            Sign Up
                        </Button>
                    </Link>
                </div>
            )}
        </nav>
    )
}

export default AuthNav