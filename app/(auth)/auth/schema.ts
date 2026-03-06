import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string()
        .trim()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
})

export const registerSchema = z.object({
    name: z.string()
        .trim()
        .min(1, 'Name is required')
        .min(3, 'Name must be at least 3 characters')
        .min(10, 'Name is too long'),
    email: z.string()
        .trim()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
})

export const completeRegisterSchema = z.object({
    name: z.string().min(3).trim(),
    password: z.string().min(8).trim()
})

export const ResetPasswordSchema = z.object({
    password: z.string().min(8).trim(),
    confirmPassword: z.string().min(8).trim()
})