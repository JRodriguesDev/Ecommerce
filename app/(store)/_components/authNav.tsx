'use client'

import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { TiStarFullOutline } from "react-icons/ti";
import { Button } from "@/components/ui/button"; // Se estiver usando Shadcn

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const AuthNav = () => {
    const { status } = useSession()
    
    return (
        <nav className="flex items-center gap-4">
            { status === 'authenticated' ? (
                <>
                    {/* Favoritos */}
                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-all group">
                        <TiStarFullOutline className="text-yellow-500 group-hover:scale-110 transition-transform" size={20}/> 
                        <span className="hidden lg:inline text-sm font-medium">Favorites</span>
                    </button>

                    {/* Carrinho */}
                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-all group">
                        <FaShoppingCart className="group-hover:scale-110 transition-transform" size={18}/> 
                        <span className="hidden lg:inline text-sm font-medium">Cart</span>
                    </button>

                    <DropdownMenu>
                    {/* O Trigger substitui o NavigationMenuTrigger */}
                    <DropdownMenuTrigger className="focus:outline-none">
                        <div className="p-2 bg-transparent hover:bg-zinc-900 text-zinc-400 hover:text-white rounded-full transition-colors cursor-pointer">
                        <FaUserCircle size={24} />
                        </div>
                    </DropdownMenuTrigger>

                    {/* O segredo está no align="end" */}
                    <DropdownMenuContent 
                        align="end" 
                        className="w-[200px] bg-zinc-950 border-zinc-800 p-2 shadow-2xl"
                    >
                        <DropdownMenuLabel className="text-xs font-medium text-zinc-500 px-2 py-1.5 uppercase tracking-wider">
                        Settings
                        </DropdownMenuLabel>
                        
                        <DropdownMenuItem asChild>
                        <Link 
                            href="/profile" 
                            className="w-full block px-2 py-1.5 text-sm text-zinc-300 hover:text-white focus:bg-zinc-900 focus:text-white rounded-md transition-colors cursor-pointer"
                        >
                            My Profile
                        </Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator className="bg-zinc-800 my-1" />

                        <DropdownMenuItem 
                        onClick={() => signOut()}
                        className="w-full px-2 py-1.5 text-sm text-red-400 hover:text-red-300 focus:bg-red-950/30 focus:text-red-300 rounded-md transition-colors cursor-pointer flex items-center gap-2"
                        >
                        Sign Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </>
            ) : (
                <div className="flex items-center gap-2">
                    <Link href='/auth/login'>
                        <Button variant="ghost" className="text-zinc-400 hover:text-white">
                            Sign In
                        </Button>
                    </Link>
                    <Link href='/auth/register'>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            Sign Up
                        </Button>
                    </Link>
                </div>
            )}
        </nav>
    )
}

export default AuthNav