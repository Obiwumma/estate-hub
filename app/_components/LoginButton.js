"use client";

import { signInWithGoogle } from '@/lib/action';
import React from 'react'

function LoginButton() {
  return (
    <div>
      <button className="px-4 py-2 text-gray-600 border-2 rounded" onClick={signInWithGoogle} formAction={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  )
}

export default LoginButton
