'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { CheckCircle2, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export const SuccessNotification = () => {
    const { update } = useSession()
    const [progress, setProgress] = useState(100)
    const [isVisible, setIsVisible] = useState(true)
    const [isPaused, setIsPaused] = useState(false)
    
    // Trava para evitar o loop de requisições
    const hasUpdated = useRef(false)
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    
    const DURATION = 6000 // 6 segundos
    const STEP = 50

    useEffect(() => {
        if (!hasUpdated.current) {
            update({ countUpdate: true })
            hasUpdated.current = true
        }

        // Lógica do Timer
        if (!isPaused && isVisible) {
            timerRef.current = setInterval(() => {
                setProgress((prev) => {
                    const next = prev - (100 / (DURATION / STEP))
                    if (next <= 0) {
                        clearInterval(timerRef.current!)
                        setIsVisible(false)
                        return 0
                    }
                    return next
                })
            }, STEP)
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [isPaused, isVisible, update]) // O hasUpdated.current não dispara re-run

    if (!isVisible) return null

    return (
        <div 
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="fixed top-22 right-6 z-50 w-full max-w-sm bg-zinc-950 border border-emerald-500/20 rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-right-full duration-500"
        >
            <div className="p-4 flex items-center gap-4">
                <div className="size-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="size-6 text-emerald-500" />
                </div>
                
                <div className="flex-1">
                    <p className="text-sm font-bold text-zinc-100">Purchase Completed!</p>
                </div>

                <button 
                    onClick={() => setIsVisible(false)}
                    className="p-1 hover:bg-zinc-900 rounded-md transition-colors"
                >
                    <X className="size-4 text-zinc-500" />
                </button>
            </div>

            {/* Barra de Progresso */}
            <div className="h-1 w-full bg-zinc-900">
                <div 
                    className={cn(
                        "h-full bg-emerald-500 transition-all ease-linear",
                        isPaused && "bg-amber-500"
                    )}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    )
}