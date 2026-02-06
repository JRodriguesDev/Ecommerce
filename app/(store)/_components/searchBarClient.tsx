'use client'

import { FaSearch } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import Form from "next/form";
import { useState } from "react";
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchBarClient = ({children}: {children: React.ReactNode}) => {
    const [isOpen, setIsOpen] = useState(false)
    const params = useSearchParams()
    const category = params.get('cat') || null

    return (
        <Form className="relative flex items-center w-full max-w-xl group gap-2" action='/products'>
            {/* Botão de Categorias - Removi o absolute negativo para evitar quebra no mobile */}
            <Button 
                type="button"
                variant="ghost" 
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className={`shrink-0 transition-all ${isOpen ? "bg-zinc-900 text-blue-500" : "text-zinc-400 hover:text-white"}`}
                aria-label="Toggle categories"
            >
                <BiCategory size={24} />
            </Button>

            {/* Input Container */}
            <div className="relative w-full">
                {category && <input type="hidden" name="cat" value={category} />}
                <Input 
                    name="q"
                    type="text" 
                    placeholder={category ? `Search in ${category}...` : "Search for products..."} 
                    className="w-full bg-zinc-900/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 pl-4 pr-10 h-10 focus-visible:ring-1 focus-visible:ring-blue-600 focus-visible:border-blue-600 transition-all"
                />
                
                <button 
                    type="submit"
                    aria-label="Search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-blue-500 transition-colors"
                >
                    <FaSearch size={16} />
                </button>
            </div>

            {/* Dropdown de Categorias */}
            {isOpen && (
                <div 
                    className="absolute top-12 left-0 w-64 z-50 animate-in fade-in zoom-in-95 duration-200"
                    onClick={() => setIsOpen(false)} // Fecha ao selecionar uma categoria
                >
                    <div className="bg-zinc-950 border border-zinc-800 rounded-lg shadow-2xl p-2">
                        {children}
                    </div>
                </div>
            )}
        </Form>
    )
}

export default SearchBarClient