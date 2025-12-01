"use client";

import { createBrowserClient } from '@supabase/auth-helpers-nextjs';

export default function LogoutButton() {
  const supabase = createBrowserClient();

  async function handleLogout() {
    await supabase.auth.signOut({ scope: "local" }); 
    window.location.href = "/auth/login"; // redirect after logout
  }

  return (
    <button 
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded"
    >
      Logout
    </button>
  );
}
