'use client'

import { FaSearch } from "react-icons/fa";
import Form from "next/form";
import { useState } from "react";
import { BiCategory } from "react-icons/bi";

const SearchBarClient = ({children}: {children: React.ReactNode}) => {
    const [isOpen, setIsOpen] = useState(false)


    return (
        <Form className="relative w-2/6 flex items-center" action='/products'>
            <BiCategory onClick={() => setIsOpen(!isOpen)} className="text-black text-3xl absolute -left-12 cursor-pointer hover:scale-110 duration-75"/>
            <input 
                name="q"
                className="bg-white w-full text-black rounded border-4 border-black hover:shadow-2xl hover:scale-105 duration-75" 
                type="text" 
                placeholder="Digite o Nome do Produto " />
            <FaSearch className="absolute right-2.5 text-black cursor-pointer"/>
            {isOpen && children}
        </Form>
    )
}

export default SearchBarClient
