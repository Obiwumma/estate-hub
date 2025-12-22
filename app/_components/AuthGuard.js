"use client"

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation"; 
import { supabase } from "@/lib/supabase/client";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname(); // Get the current URL
  const [loading, setLoading] = useState(true);

  // Define which routes need protection
  const protectedRoutes = ["/dashboard", "/account", "/help"];

  // Check if the current path matches a protected route
  const isProtected = protectedRoutes.some((route) => 
    pathname?.startsWith(route)
  );

  useEffect(() => {
    // If the page is PUBLIC, stop here. We don't need to check auth.
    if (!isProtected) {
      setLoading(false);
      return;
    }

    // If the page is PROTECTED, check Supabase session
    async function checkUser() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/auth/login");
      } else {
        setLoading(false);
      }
    }

    checkUser();
  }, [pathname, isProtected, router]);

  // 3. Render Logic
  
  // If we are still checking a PROTECTED route, show a loader
  if (loading && isProtected) {
    return <div className="p-8">Loading...</div>; // Or your Skeleton Loader
  }

  // Otherwise (Public route OR Authenticated User), show the page
  return children;
}