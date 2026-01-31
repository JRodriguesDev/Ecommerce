    import SearchBarClient from "./searchBarClient"
    import { DropCategories } from "./dropCategories"
    import { Suspense } from "react"
    
    const SearchBarServer = () => {
        return (
<           Suspense fallback={<div className="h-10 w-full bg-zinc-800 animate-pulse rounded-md" />}>
                <SearchBarClient>
                    <DropCategories/>
                </SearchBarClient>
            </Suspense>
        )
    }

    export default SearchBarServer