import Link from 'next/link'

export const SidebarItem = ({
    href,
    icon,
    label,
    active = false,
    badgeCount = 0 // Nova prop
}: {
    href: string,
    icon: React.ReactNode,
    label: string,
    active?: boolean,
    badgeCount?: number // Tipagem
}) => {
    return (
        <Link
            href={href}
            className={`
                flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 overflow-hidden
                ${active
                    ? 'bg-zinc-900 text-white font-semibold'
                    : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50'}
            `}
        >
            {/* Adicionamos RELATIVE aqui para a bolinha se posicionar em relação ao ícone */}
            <div className="relative text-xl shrink-0">
                <span className={`${active ? 'text-blue-500' : ''}`}>
                    {icon}
                </span>

                {/* Só mostra se badgeCount for passado e maior que 0 */}
                {badgeCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-1 ring-black">
                        {badgeCount}
                    </span>
                )}
            </div>

            <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {label}
            </span>
        </Link>
    )
}