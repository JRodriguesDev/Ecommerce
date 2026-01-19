import {PrismaPg} from '@prisma/adapter-pg'
import {Pool} from 'pg'
import { PrismaClient } from "@/generated/prisma/client";
import type { Prisma } from "@/generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate"

const adapter = new PrismaPg(new Pool({connectionString: process.env.DATABASE_URL}))
const prisma = new PrismaClient({adapter}).$extends(withAccelerate())

export default prisma
export type {Prisma}