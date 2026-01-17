import {PrismaPg} from '@prisma/adapter-pg'
import {Pool} from 'pg'
import { PrismaClient } from "@/generated/prisma/client";
import type { Prisma } from "@/generated/prisma/client";

const adapter = new PrismaPg(new Pool({connectionString: process.env.DATABASE_URL}))
const prisma = new PrismaClient({adapter})

export default prisma
export type {Prisma}