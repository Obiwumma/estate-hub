"use client"

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation"; 
import { supabase } from "@/lib/supabase/client";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  // 1. Define Public Paths
  const publicPaths = ["/login", "/signup", "/auth/login", "/auth/signup", "/"];
  const isProtected = !publicPaths.includes(pathname);

  // 2. THE FIX: Initialize 'loading' based on whether the page IS protected.
  // If it's a public page, loading starts as 'false'. No state update needed!
  const [loading, setLoading] = useState(isProtected);

  useEffect(() => {
    // If it's public, we don't need to do anything because loading is already false.
    if (!isProtected) {
      return;
    }

    // Only check auth if the page is protected
    async function checkUser() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/auth/login");
      } else {
        setLoading(false);
      }
    }

    checkUser();
  }, [isProtected, router]);

  // 3. Render Logic
  if (loading) {
    return <div className="p-8 flex justify-center">Loading...</div>;
  }

  return <>{children}</>;
}