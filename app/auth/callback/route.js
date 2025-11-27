// app/auth/callback/route.js
import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request) {
  const requestUrl = new URL(request.url)
  const { searchParams, origin } = requestUrl

  const code = searchParams.get('code')
  let next = searchParams.get('next') ?? '/'

  // Ensure next is a relative path (security)
  if (!next.startsWith('/')) {
    next = '/'
  }

  // If we have an auth code, exchange it for a session
  if (code) {
    const supabase = await createClient()

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Redirect handling for local dev vs production (Vercel, etc.)
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'

      if (isLocalEnv) {
        // Localhost — use origin directly
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        // Production behind proxy/load balancer (e.g. Vercel)
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        // Fallback
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // If no code or exchange failed → go to error page
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}