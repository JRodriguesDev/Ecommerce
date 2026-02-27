// store/useCartStore.ts
import { create } from 'zustand'

interface CartStore {
  count: number
  setInitialCount: (value: number) => void
}

export const useCartStore = create<CartStore>((set) => ({
    count: 0,
    setInitialCount: (value) => set({count: value})
}))