import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const authCookie = request.cookies.get('auth')

  // Rutas que requieren autenticación
    if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!authCookie) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    }

  // Redirigir usuarios autenticados fuera de la página de login
    if (request.nextUrl.pathname === '/login') {
    if (authCookie) {
        return NextResponse.redirect(new URL('/admin/products', request.url))
    }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*', '/login']
}