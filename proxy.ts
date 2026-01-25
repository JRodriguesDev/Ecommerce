import {NextRequest, NextResponse} from 'next/server'
import {auth} from '@/lib/authjs/auth'

export const proxy = async (req: NextRequest) => {
    const session = await auth()
    console.log(session)
    if (!session) return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/seed'
    ]
}