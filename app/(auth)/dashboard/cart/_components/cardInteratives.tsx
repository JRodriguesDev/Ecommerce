'use client'

import { useState, useTransition } from "react"
import { LuPlus, LuMinus, LuTrash2, LuLoader } from "react-icons/lu"
import { useDebouncedCallback } from 'use-debounce'
import { updateCartQuantityAction, removeCartProductAction } from '../actions'
import { useRouter } from "next/navigation"
import {useSession} from 'next-auth/react'

interface QuantityProps {
  productId: string
  initialQuantity: number
  stock: number
}

export const QuantityControls = ({ productId, initialQuantity, stock }: QuantityProps) => {
  const {update} = useSession()
  // 1. Estado local simples para resposta visual instantânea
  const [quantity, setQuantity] = useState(initialQuantity)

  // 2. Debounce: Ele "escuta" as mudanças, mas só dispara a action 
  // depois que você parar de clicar por 500ms
  const debouncedUpdate = useDebouncedCallback(async (value: number) => {
    await updateCartQuantityAction(productId, value)
    await update({countUpdate: true})
  }, 500)

  const handleUpdate = (newQty: number) => {
    if (newQty < 1 || newQty > stock) return

    // Atualiza o número na tela IMEDIATAMENTE
    setQuantity(newQty)

    // Avisa o debounce para se preparar para o POST
    debouncedUpdate(newQty)
  }

  return (
    <div className="flex items-center gap-1 bg-black/20 border border-zinc-800/40 rounded-lg p-0.5">
      <button
        className="p-1.5 text-zinc-500 hover:text-white transition-colors disabled:opacity-30"
        onClick={() => handleUpdate(quantity - 1)}
        disabled={quantity <= 1}
      >
        <LuMinus className="size-3" />
      </button>

      <span className="text-[11px] font-bold text-zinc-200 w-5 text-center">
        {quantity}
      </span>

      <button
        className="p-1.5 text-zinc-500 hover:text-white transition-colors disabled:opacity-30"
        onClick={() => handleUpdate(quantity + 1)}
        disabled={quantity >= stock}
      >
        <LuPlus className="size-3" />
      </button>
    </div>
  )
}

export const TrashButton = ({ productId }: { productId: string }) => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleRemove = () => {
        // Envolvemos a chamada da Action no startTransition
        startTransition(async () => {
            await removeCartProductAction(productId)
            router.refresh()
        })
    }

    return (
        <button 
            onClick={handleRemove} 
            disabled={isPending}
            className="p-2 text-zinc-700 hover:text-red-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            title="Remover produto"
        >
            {isPending ? (
                <LuLoader className="size-4 animate-spin text-zinc-500" />
            ) : (
                <LuTrash2 className="size-4 group-hover:scale-110 transition-transform" />
            )}
        </button>
    )
}