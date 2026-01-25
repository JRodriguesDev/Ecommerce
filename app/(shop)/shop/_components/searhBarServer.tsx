    import SearchBarClient from "./searchBarClient"
    import { DropCategories } from "./category"
    const SearchBarServer = () => {
        return (
            <SearchBarClient>
                <DropCategories/>
            </SearchBarClient>
        )
    }

    export default SearchBarServer