import {z} from 'zod'

export const loginSchema = z.object({
    email: z.string(),
    password: z.string().min(8)
})

export const registerSchema = z.object({
    name: z.string().min(3),
    email: z.string(),
    password: z.string().min(8)
})
