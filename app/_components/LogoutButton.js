"use client";
import { supabase } from "@/lib/supabase/client";
import { FiLogOut } from "react-icons/fi";

export default function LogoutButton() {

  async function handleLogout() {
    await supabase.auth.signOut({ scope: "local" }); 
    window.location.href = "/auth/login"; // redirect after logout
  }

  return (
    <button 
  onClick={handleLogout}
  className="group flex items-center justify-start w-full gap-3 px-4 py-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out rounded-xl hover:bg-red-50 hover:text-red-600"
>
  {/* Icon Wrapper: Adds a subtle slide effect on hover */}
  <div className="p-2 transition-colors duration-200 bg-gray-100 rounded-lg group-hover:bg-white group-hover:text-red-600">
    <FiLogOut className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
  </div>
  
  <span>Sign Out</span>
</button>
  );
}
