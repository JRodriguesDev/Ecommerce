import Link from 'next/link'
import { Lock } from 'lucide-react' // Opcional: ícone de cadeado para passar segurança

export const Header = () => {
    return (
        <header className='sticky top-0 z-50 w-full h-16 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl flex items-center'>
            <div className='container mx-auto px-6 flex items-center justify-between'>
                {/* Logo e Contexto */}
                <div className='flex items-center gap-4'>
                    <Link
                        className='text-zinc-100 text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity flex items-center gap-2' 
                        href='/shop'
                    >
                        <div className='size-6 bg-blue-600 rounded-sm rotate-45' />
                        <span className="hidden sm:inline">Ecommerce</span>
                    </Link>
                    
                    {/* Divisor Vertical */}
                    <div className='h-4 w-px bg-zinc-800' />
                    
                    <span className='text-xs font-medium text-zinc-400 uppercase tracking-widest'>
                        Checkout
                    </span>
                </div>

                {/* Elementos de Segurança e Suporte */}
                <nav className='flex items-center gap-6'>
                    <div className='hidden md:flex items-center gap-2 text-xs text-zinc-500'>
                        <Lock className='size-3 text-emerald-500' />
                        Secure Encryption
                    </div>
                    
                    <Link 
                        href="#" 
                        className='text-xs font-medium text-zinc-400 hover:text-zinc-100 transition-colors py-1 px-3 rounded-full border border-zinc-800 hover:bg-zinc-900'
                    >
                        Need help?
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Header