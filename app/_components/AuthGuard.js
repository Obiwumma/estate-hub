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

  useEffect(() => {
    // 1. If public, just ensure loading is false and stop
    if (!isProtected) {
      setLoading(false);
      return;
    }

    // 2. If protected, check Supabase
    async function checkUser() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/auth/login");
      } else {
        setLoading(false);
      }
    }

    checkUser();
  }, [isProtected, router]); // Hook is always called now

  // 3. RENDER LOGIC (Happens AFTER hooks)
  
  // If public, show content immediately
  if (!isProtected) {
    return <>{children}</>;
  }

  // If protected and checking, show loader
  if (loading) {
    return <div className="p-8 flex justify-center">Loading...</div>;
  }

  // If protected and logged in, show content
  return <>{children}</>;
}