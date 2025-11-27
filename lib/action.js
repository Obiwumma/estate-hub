"use server"

import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "./supabase/server.server"


const signInWith = provider => async() =>{
  const supabase = await createServerSupabaseClient()

  const auth_callback_url = `${process.env.SITE_URL}/auth/callback`
  
  const {data, error} = 
  await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
    }
  })

  console.log(data);

  if(error) {
    console.log(error);
  }
  
 redirect(data.url)
}

const signInWithGoogle = signInWith('google')

export { signInWithGoogle }