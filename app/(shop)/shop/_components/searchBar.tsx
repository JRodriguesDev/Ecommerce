import { BiCategory } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { Suspense } from "react";
import Form from "next/form";
import {Categories, CategoriesSkeleton} from './categoryList'

export const SearchBar = () => {

    return (
        <Form className="relative w-2/6 flex items-center" action={'/product'}>
            <BiCategory className="text-black text-3xl absolute -left-12 cursor-pointer hover:scale-110 duration-75"/>
            <input 
                name="q"
                className="bg-white w-full text-black rounded border-4 border-black hover:shadow-2xl hover:scale-105 duration-75" 
                type="text" 
                placeholder="Digite o Nome do Produto " />
            <FaSearch className="absolute right-2.5 text-black cursor-pointer"/>
            <DropCategories/>
        </Form>
    )
}

const DropCategories = () => {

    return (
        <div className="absolute w-2/6 min-h-30 bg-red-600 -bottom-45 -left-25 z-10 rounded-md">
            <Suspense fallback={<CategoriesSkeleton/>}>
                <Categories/>
            </Suspense>
        </div>
    )
} 