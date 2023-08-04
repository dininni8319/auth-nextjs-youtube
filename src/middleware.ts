import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value || ''
  const isPublicPath = pathname === '/login' || pathname === '/' || pathname ==='/signup' || pathname === '/verifyemail'

  if (isPublicPath && token) {
    return NextResponse.redirect(
      new URL('/', request.nextUrl)
    )
  } 
  if (!isPublicPath && !token) {
    return NextResponse.redirect(
      new URL('/login', request.nextUrl)
    )
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail'
  ],
}