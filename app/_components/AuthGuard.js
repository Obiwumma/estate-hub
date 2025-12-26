"use client"

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation"; 
import { supabase } from "@/lib/supabase/client";

export default function AuthGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Define public paths
  const publicPaths = ["/login", "/signup", "/auth/login", "/auth/signup", "/"];
  const isProtected = !publicPaths.includes(pathname);

  // 1. THE FIX: If it is public, render immediately. 
  // We do not wait for useEffect or State. We just show the page.
  if (!isProtected) {
    return <>{children}</>;
  }

  useEffect(() => {
    // 2. We removed the "if (!isProtected)" block from here entirely.
    // The effect now ONLY handles checking the session for protected pages.
    
    async function checkUser() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/auth/login");
      } else {
        setLoading(false);
      }
    }

    checkUser();
  }, [router]); // Removed 'isProtected' dependency since we handle it above

  // 3. Render Logic for Protected Pages
  if (loading) {
    return <div className="p-8">Loading...</div>; 
  }

  // User is authenticated
  return <>{children}</>;
}