// store/useCartStore.ts
import { create } from 'zustand'

interface CartStore {
  count: number
  addItem: () => void
  setInitialCount: (value: number) => void
}

export const useCartStore = create<CartStore>((set) => ({
    count: 0,
    addItem: () => set((state) => ({count: state.count + 1})),
    setInitialCount: (value) => set({count: value})
}))