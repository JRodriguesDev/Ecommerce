import SearchBarClient from "./searchBarClient"
import { DropCategories } from "./dropCategories"
import { Suspense } from "react"

const SearchBarServer = () => {
    return (
        /* O fallback deve mimetizar o tamanho real da barra de busca */
        <Suspense fallback={<div className="h-10 w-full bg-zinc-900/50 border border-zinc-800 animate-pulse rounded-lg" />}>
            <SearchBarClient>
                <DropCategories />
            </SearchBarClient>
        </Suspense>
    )
}

export default SearchBarServer