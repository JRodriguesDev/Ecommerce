import Link from 'next/link'
import { LuArrowLeft } from 'react-icons/lu'

const Header = () => {
    return (

        <header className='sticky top-0 z-50 w-full h-16 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md flex items-center'>
            <div className='container mx-auto px-6 flex items-center justify-between'>
                <Link
                    className='text-zinc-100 text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity flex items-center gap-2' 
                    href='/shop'
                >
                    <div className='size-6 bg-blue-600 rounded-sm rotate-45' />
                    Ecommerce
                </Link>
                <nav>
    <Link 
        href="/shop" 
        className="group flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-zinc-100 transition-all"
    >
        <LuArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        Back to Shop
    </Link>
</nav>
            </div>
        </header>
    )
}

export default Header