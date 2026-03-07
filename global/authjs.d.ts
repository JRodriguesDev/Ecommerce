import NextAuth, { DefaultSession } from "next-auth";
import {JWT} from 'next-auth/jwt'

declare module 'next-auth' {
    interface User {
        picture?: string | null

    }

    interface Session {
        user: {
            customerId?: string | null
            needsProfile?: boolean | null
            cartCount?: number | null
        } & DefaultSession['user']
    }

}

declare module 'next-auth/jwt' {
    interface JWT {
        // Adicione diretamente aqui, pois o JWT "é" o token
        cartCount?: number | null
        customerId?: string | null
        picture?: string | null
    }
}