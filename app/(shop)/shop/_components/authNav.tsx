'use client'

import Link from "next/link"
import { signOut, useSession} from "next-auth/react"
import {FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { TiStarFullOutline } from "react-icons/ti";

const AuthNav = () => {
    const {status} = useSession()
    
    return (
        <nav className="flex items-center gap-6">
            { status == 'authenticated' ? (
                    <>
                        <button className="flex items-center gap-2 cursor-pointer hover:scale-110 duration-100 text-black font-semibold"><TiStarFullOutline className="text-yellow-300"/> Favoritos</button>
                        <button className="flex items-center gap-2 cursor-pointer hover:scale-110 duration-100 text-black font-semibold"> <FaShoppingCart className="text-gray-300"/> Carrinho</button>
                        <button className="text-black text-3xl hover:scale-105 duration-100 cursor-pointer" onClick={() => signOut()}><FaUserCircle/></button>
                    </>
                ) : (
                    <>
                        <Link href={'/auth/login'} className="flex items-center gap-2 cursor-pointer hover:scale-110 duration-100 text-black font-semibold">Entrar</Link>
                        <Link href={'/auth/register'} className="flex items-center gap-2 cursor-pointer hover:scale-110 duration-100 text-black font-semibold">Registrar</Link>
                    </>
                )
            }
        </nav>
    )
}

export default AuthNav