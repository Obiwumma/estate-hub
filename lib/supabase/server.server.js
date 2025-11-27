// lib/supabase/server.server.js
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createServerSupabaseClient() {
  const cookieStore = cookies()

  // Optional but recommended: throw early if env vars are missing
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,      // ← no !
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, // ← no !
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
        set(name, value, options) {
          try {
            cookieStore.set(name, value, options)
          } catch {
            // ignore – happens outside request context (e.g. during build)
          }
        },
        remove(name, options) {
          try {
            cookieStore.delete({ name, ...options })
          } catch {
            // ignore
          }
        },
      },
    }
  )
}