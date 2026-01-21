'use client'

import { FaUserCircle, FaSearch, FaShoppingCart } from "react-icons/fa";
import { TiStarFullOutline } from "react-icons/ti";
import { BiCategory } from "react-icons/bi";
import { signOut, useSession} from "next-auth/react"


const Header = () => {
    const {data: session, status} = useSession()


    return (
        <header className="bg-blue-900 w-full h-24 flex flex-col">
            <div className="w-full flex flex-1 flex-row items-center justify-around gap-10">
                <h1 className="cursor-pointer text-black text-2xl font-semibold hover:scale-105 duration-75">Ecommerce</h1>
                <div className="relative w-2/6 flex items-center">
                <BiCategory className="text-black text-3xl absolute -left-12 cursor-pointer hover:scale-110 duration-75"/>
                    <input 
                        className="bg-white w-full text-black rounded border-4 border-black hover:shadow-2xl hover:scale-105 duration-75" 
                        type="text" 
                        placeholder="Digite o Nome do Produto " />
                    <FaSearch className="absolute right-2.5 text-black cursor-pointer"/>
                </div>
                <nav className="flex items-center gap-6">
                    { status == 'authenticated' ? (
                        <>
                            <button className="flex items-center gap-2 cursor-pointer hover:scale-110 duration-100 text-black font-semibold"><TiStarFullOutline className="text-yellow-300"/> Favoritos</button>
                            <button className="flex items-center gap-2 cursor-pointer hover:scale-110 duration-100 text-black font-semibold"> <FaShoppingCart className="text-gray-300"/> Carrinho</button>
                            <button className="text-black text-3xl hover:scale-105 duration-100 cursor-pointer" onClick={() => signOut()}><FaUserCircle/></button>
                        </>
                    ) : (
                        <>
                            <button className="flex items-center gap-2 cursor-pointer hover:scale-110 duration-100 text-black font-semibold">Entrar</button>
                            <button className="flex items-center gap-2 cursor-pointer hover:scale-110 duration-100 text-black font-semibold">Registrar</button>
                        </>
                    )
                    }
                </nav>
            </div>    
        </header>
    )
}

export default Header