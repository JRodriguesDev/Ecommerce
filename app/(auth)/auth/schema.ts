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
        .max(10, 'Name is too long'),
    email: z.string()
        .trim()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
})

export const magicLinkSchema = z.object({
    email: z.string()
        .trim()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
})

export const completeRegisterSchema = z.object({
    name: z.string()
        .trim()
        .min(1, 'Name is required')
        .min(3, 'Name must be at least 3 characters')
        .max(10, 'Name is too long'),
    password: z.string()
        .min(8,'Password must be at least 8 characters')
})

export const ResetPasswordSchema = z.object({
    password: z.string().min(8).trim(),
    confirmPassword: z.string().min(8).trim()
})