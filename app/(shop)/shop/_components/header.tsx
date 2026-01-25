import Link from "next/link";
import SearchBarServer from "./searhBarServer";
import AuthNav from "./authNav";

const Header = () => {

    return (
        <header className="bg-blue-900 w-full h-24 flex flex-col">
            <div className="w-full flex flex-1 flex-row items-center justify-around gap-10">
                <Link href='/shop' className="cursor-pointer text-black text-2xl font-semibold hover:scale-105 duration-75">Ecommerce</Link>
                <SearchBarServer/>
                <AuthNav/>
            </div>    
        </header>
    )
}

export default Header