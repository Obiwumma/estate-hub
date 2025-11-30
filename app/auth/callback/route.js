// import { NextResponse } from 'next/server';
// import { createServerSupabaseClient } from '@/lib/supabase/server.server';// your server client

// export async function GET(request) {
//   const { searchParams, origin } = new URL(request.url);
//   const code = searchParams.get('code');

//   // If "next" param exists, redirect user there after login
//   let next = searchParams.get('next') ?? "/";
//   if (!next.startsWith("/")) {
//     // Prevent redirecting to external URLs
//     next = "/";
//   }

//   if (code) {
//     const supabase = createServerSupabaseClient();
//     const { error } = await supabase.auth.exchangeCodeForSession(code);

//     if (!error) {
//       const forwardedHost = request.headers.get("x-forwarded-host");
//       const isLocalEnv = process.env.NODE_ENV === "development";

//       if (isLocalEnv) {
//         // In local: no load balancer
//         return NextResponse.redirect(`${origin}${next}`);
//       } else if (forwardedHost) {
//         // In production: behind a load balancer
//         return NextResponse.redirect(`https://${forwardedHost}${next}`);
//       } else {
//         return NextResponse.redirect(`${origin}${next}`);
//       }
//     }
//   }

//   // If something failed
//   return NextResponse.redirect(`${origin}/auth/auth-code-error`);
// }



// /app/auth/callback/route.js
import { NextResponse } from "next/server";

export async function GET(request) {
  const { origin, searchParams } = new URL(request.url);

  // Optional: allow a "next" param to redirect somewhere else
  let next = searchParams.get("next") ?? "/dashboard";
  if (!next.startsWith("/")) next = "/dashboard"; // prevent external redirect

  // Implicit flow: Supabase already sets cookies, so no code exchange needed
  return NextResponse.redirect(`${origin}${next}`);
}
