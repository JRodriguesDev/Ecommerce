import Link from "next/link";
import SearchBarServer from "./searhBarServer";
import AuthNav from "./authNav";
import { IoBagHandleOutline } from "react-icons/io5";

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full h-20 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md flex items-center">
            <div className="container mx-auto px-6 flex flex-row items-center justify-between gap-4 md:gap-8">
                
                {/* Logo Section */}
                <Link 
                    href='/shop' 
                    aria-label="Home"
                    className="flex items-center gap-2 shrink-0 whitespace-nowrap text-zinc-100 text-2xl font-bold tracking-tighter hover:opacity-80 transition-all"
                >
                    <span className="size-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <IoBagHandleOutline className="text-white" size={20} />
                    </span>
                    <span className="hidden lg:block">Ecommerce</span>
                </Link>

                {/* Search Section - Centralizada */}
                <div className="flex-1 max-w-2xl px-2">
                    <SearchBarServer />
                </div>

                {/* Navigation/Auth Section */}
                <div className="flex items-center gap-4 shrink-0">
                    <AuthNav />
                </div>
            </div>    
        </header>
    )
}

export default Header