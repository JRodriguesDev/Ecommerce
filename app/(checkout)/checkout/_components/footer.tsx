import Link from 'next/link'

export const Footer = () => {

    return (
        <footer className='w-full py-8 border-t border-zinc-900 bg-zinc-950'>
            <div className='container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6'>
                
                {/* Lado Esquerdo: Copyright e Status */}
                <div className='flex flex-col gap-2 items-center md:items-start'>
                    <p className='text-[10px] uppercase tracking-widest text-zinc-600 font-semibold'>
                        © Seu Ecommerce Inc.
                    </p>
                    <div className='flex items-center gap-2'>
                        <div className='size-1.5 rounded-full bg-emerald-500 animate-pulse' />
                        <span className='text-[10px] text-zinc-500 font-medium'>All systems operational</span>
                    </div>
                </div>

                {/* Centro: Bandeiras de Cartão (Opcional/SVG) */}
                <div className='flex items-center gap-4 opacity-30 grayscale hover:grayscale-0 transition-all duration-500'>
                    {/* Aqui você pode colocar pequenos SVGs de Visa, Mastercard, etc */}
                    <div className='h-4 w-8 bg-zinc-800 rounded-sm' />
                    <div className='h-4 w-8 bg-zinc-800 rounded-sm' />
                    <div className='h-4 w-8 bg-zinc-800 rounded-sm' />
                </div>

                {/* Lado Direito: Links Legais */}
                <nav className='flex items-center gap-6'>
                    <Link href="/terms" className='text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors'>
                        Terms
                    </Link>
                    <Link href="/privacy" className='text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors'>
                        Privacy
                    </Link>
                    <Link href="/security" className='text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors'>
                        Security
                    </Link>
                </nav>
            </div>
        </footer>
    )
}

export default Footer