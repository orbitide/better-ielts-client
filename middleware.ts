import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(_request: NextRequest) {
  // TODO: re-enable cookie-based auth check once the API is proxied through
  // localhost:3000 (currently auth_access is set on the API origin, e.g.
  // localhost:5000, so this middleware can never see it). Until then, auth
  // is enforced client-side via AuthGate + the Zustand auth store bootstrap.
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
    '/call/:path*',
    '/mock-test/:path*',
    '/vocabulary/:path*',
    '/account/:path*',
    '/settings/:path*',
    '/support/:path*',
    '/onboarding/:path*',
  ],
}
