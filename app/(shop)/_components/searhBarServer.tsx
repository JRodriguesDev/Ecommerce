    import SearchBarClient from "./searchBarClient"
    import { DropCategories } from "./dropCategories"
    const SearchBarServer = () => {
        return (
            <SearchBarClient>
                <DropCategories/>
            </SearchBarClient>
        )
    }

    export default SearchBarServer