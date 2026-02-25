import {NextRequest, NextResponse} from 'next/server'
import {auth} from '@/lib/authjs/auth'

export const proxy = async (req: NextRequest) => {
    const {nextUrl} = req
    const isDashboard = nextUrl.pathname.startsWith('/dashboard')
    const isAuth = nextUrl.pathname.startsWith('/auth')
    const isCheckout = nextUrl.pathname.startsWith('/checkout')
    const publicRoute = nextUrl.pathname.startsWith('/')
    const session = await auth()
    const needsProfile = session?.user?.needsProfile ?? false

    // REGRA 1: Se está logado mas o perfil está incompleto, 
    // obriga a ir para a página de finalização (a menos que já esteja nela)
    if (session && publicRoute && needsProfile && !isAuth) return NextResponse.redirect(new URL('/auth/completeRegistration', req.nextUrl))
    // REGRA 2: Proteção do Dashboard
    // Se não está logado e tenta acessar o dashboard, vai para o login
    if (!session && isDashboard && !isAuth) return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
    if (!session && isCheckout && !isAuth) return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}