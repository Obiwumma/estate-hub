"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthGuard({ children }) {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/login"); // redirect if not logged in
      } else {
        setLoading(false); // user is authenticated
      }
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return children;
}
