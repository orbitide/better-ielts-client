import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ACCESS_COOKIE = 'auth_access'

type JwtPayload = {
  sub: string
  exp: number
}

function decodeJwt(token: string): JwtPayload | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const payload = JSON.parse(
      atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))
    ) as JwtPayload
    if (payload.exp * 1000 < Date.now()) return null
    return payload
  } catch {
    return null
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(ACCESS_COOKIE)?.value

  if (!token || !decodeJwt(token)) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${encodeURIComponent(pathname)}`, request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/study-plan/:path*',
    '/lesson/:path*',
    '/reading/:path*',
    '/listening/:path*',
    '/writing/:path*',
    '/speaking/:path*',
    '/mock-test/:path*',
    '/vocabulary/:path*',
    '/community/:path*',
    '/account/:path*',
    '/settings/:path*',
    '/support/:path*',
    '/onboarding/:path*',
  ],
}
