// app/auth/callback/route.js
import { NextResponse } from 'next/server'
// import { cookies } from 'next/headers'
import { createServerSupabaseClient } from '@/lib/supabase/server.server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

//   if (!code) {
//     return NextResponse.json({ error: "No code provided" }, { status: 400 })
//   }

//   const supabase = createServerSupabaseClient()

//   try {
//     const { error } = await supabase.auth.exchangeCodeForSession(code)

//     if (error) {
//       console.error("Supabase session error:", error)
//       return NextResponse.json({ error: error.message }, { status: 500 })
//     }
//   } catch (err) {
//     console.error("Callback crash:", err)
//     return NextResponse.json({ error: err.message }, { status: 400 })
//   }

//   return NextResponse.redirect('/dashboard')
// }



if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 })
  }

  // Don't read cookies() here — let the function do it
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error('Supabase exchange error:', error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.redirect(new URL('/dashboard', request.url))
}