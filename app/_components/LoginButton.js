"use client";

import { supabase } from '@/lib/supabase/client';
import React from 'react'

function LoginButton() {

  const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) console.error('Login error:', error);
  else console.log('Login started:', data);
};

  return (
    <div>
      <button className="px-4 py-2 text-gray-600 border-2 rounded" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
  
    </div>
  )
}

export default LoginButton
