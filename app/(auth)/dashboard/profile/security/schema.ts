import z from 'zod'

export const resetPasswordSchema = z.object({
    password: z.string().min(8, 'Password must be at least 8 characters')
})