// // middleware.js  (new version for Supabase)
// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
// import { NextResponse } from 'next/server'

// export async function middleware(req) {
//   const res = NextResponse.next()
//   const supabase = createMiddlewareClient({ req, res })

//   const { data: { session } } = await supabase.auth.getSession()

//   const protectedPaths = ['/dashboard', '/properties', '/account']
//   const isProtectedPath = protectedPaths.some(path => 
//     req.nextUrl.pathname.startsWith(path)
//   )

//   if (isProtectedPath && !session) {
//     const redirectUrl = new URL('/login', req.url)
//     redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname)
//     return NextResponse.redirect(redirectUrl)
//   }

//   return res
// }

// export const config = {
//   matcher: ['/dashboard/:path*', '/properties/:path*', '/account/:path*']
// }