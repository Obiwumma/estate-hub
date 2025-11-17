"use client"

import { supabase } from "../_lib/supabase"


function LoginPage() {
  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
        queryParams: { prompt: "select_account" },
        flowType: "pkce",
      }
    })
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">Login</h1>
      <button 
        onClick={signInWithGoogle}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Continue with Google
      </button>
    </div>
  )
}

export default LoginPage
