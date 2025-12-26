"use client"

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation"; 
import { supabase } from "@/lib/supabase/client";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  // 1. Define Public Paths
  const publicPaths = [ "/properties", "/auth/login", "/auth/signup", ];
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
    return (
      <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-6">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-96 w-full bg-gray-100 animate-pulse rounded-xl"></div>
      </div>
    )
  }

  return <>{children}</>;
}