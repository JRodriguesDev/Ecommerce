'use client'

import { FaSearch } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import Form from "next/form";
import { useState } from "react";
import { Input } from "@/components/ui/input"; // Componente do Shadcn
import { Button } from "@/components/ui/button";

const SearchBarClient = ({children}: {children: React.ReactNode}) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Form className="relative flex items-center w-full max-w-xl group" action='/products'>
            {/* Botão de Categorias */}
            <Button 
                type="button"
                variant="ghost" 
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="absolute -left-12 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all"
            >
                <BiCategory size={28} className={isOpen ? "text-blue-500" : ""} />
            </Button>

            {/* Input Container */}
            <div className="relative w-full">
                <Input 
                    name="q"
                    type="text" 
                    placeholder="Search for products..." 
                    className="w-full bg-zinc-900/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 pl-4 pr-10 h-10 focus-visible:ring-blue-600 focus-visible:border-blue-600 transition-all"
                />
                
                {/* Ícone de Busca */}
                <button 
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-blue-500 transition-colors"
                >
                    <FaSearch size={16} />
                </button>
            </div>

            {/* Dropdown de Categorias (Children) */}
            {isOpen && (
                <div className="absolute top-12 left-[-3rem] w-64 z-50">
                    {children}
                </div>
            )}
        </Form>
    )
}

export default SearchBarClient