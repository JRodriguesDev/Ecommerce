import {z} from 'zod'

export const loginSchema = z.object({
    email: z.string().trim(),
    password: z.string().min(8)
})

export const registerSchema = z.object({
    name: z.string().min(3).trim(),
    email: z.string().email(),
    password: z.string().min(8).trim()
})

export const completeRegisterSchema = z.object({
    name: z.string().min(3).trim(),
    password: z.string().min(8).trim()
})
