    import SearchBarClient from "./searchBarClient"
    import { DropCategories } from "./categoryList"
    const SearchBarServer = () => {
        return (
            <SearchBarClient>
                <DropCategories/>
            </SearchBarClient>
        )
    }

    export default SearchBarServer