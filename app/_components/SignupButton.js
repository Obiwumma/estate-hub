"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import React from 'react'

function SignupButton() {

  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault(); // prevent default form submission

    const formData = new FormData(e.target); // get form data

    const res = await signUp(formData); // call your signup function

    if (res.error) {
      setMessage(res.error);
    } else {
      setMessage("Signup successful! Please check your email for verification.");
      // Optional: redirect to login/dashboard here
    }
  }

  return (
    <div>
      <button className="bg-purple-600 text-white px-6 py-5 hover:bg-purple-700 rounded w-full" onClick={handleSubmit}>
        Sign up
      </button>
  
    </div>
  )
}

export default SignupButton
