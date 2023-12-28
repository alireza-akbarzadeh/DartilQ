import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

const middleware = withAuth(
  function middleware(req) {
    const source = `${req.nextUrl.pathname}${req.nextUrl.search}`
    if (req.nextUrl.pathname !== '/need-to-address') {
      if (!req.nextauth.token && req.nextUrl.pathname !== '/') return NextResponse.redirect(new URL('/', req.url))
      if (req.nextauth.token?.user) {
        if (!req.nextauth.token.user.address || Object.keys(req.nextauth.token.user.address).length === 0)
          return NextResponse.redirect(new URL(`/need-to-address?source=${source}`, req.url))
      }
    }
    NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
)

export { middleware }

export const config = { matcher: ['/search', '/', '/profile/:path*'] }
