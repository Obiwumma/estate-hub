"use client";
import { supabase } from "@/lib/supabase/client";

export default function LogoutButton() {

  async function handleLogout() {
    await supabase.auth.signOut({ scope: "local" }); 
    window.location.href = "/login"; // redirect after logout
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
