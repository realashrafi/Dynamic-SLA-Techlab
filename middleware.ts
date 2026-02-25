// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth_token')?.value

    // صفحات عمومی که بدون لاگین قابل دسترسی هستند
    const publicPaths = ['/login', '/register']

    const isPublicPath = publicPaths.some(path =>
        request.nextUrl.pathname === path ||
        request.nextUrl.pathname.startsWith(path + '/')
    )

    // اگر مسیر عمومی نیست و توکن ندارد → برو به لاگین
    if (!isPublicPath && !token) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
        return NextResponse.redirect(loginUrl)
    }

    // اگر لاگین کرده و می‌خواد بره لاگین/رجیستر → بفرست به داشبورد یا خانه
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url)) // یا /dashboard یا هرجا
    }

    return NextResponse.next()
}

// matcher: روی کدام مسیرها middleware اجرا بشه
export const config = {
    matcher: [
        /*
         * همه مسیرها به جز:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}