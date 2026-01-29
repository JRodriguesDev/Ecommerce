import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const normalizeRating = (rawRating: number): number => {
  if (!rawRating || rawRating < 0) return 0
  if (rawRating <= 5) return Number(rawRating.toFixed(1))
  if (rawRating <= 10) return Number((rawRating / 2).toFixed(1))
  if (rawRating <= 100) return Number((rawRating / 20).toFixed(1))
  return 5
}