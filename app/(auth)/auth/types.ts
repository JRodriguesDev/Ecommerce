import  type {Prisma} from '@/lib/prisma'

export type FormState = {
    sucess: boolean
    error: string | null
}