"use client";

import { useEffect, useState } from "react";
import { supabase } from "../_lib/supabase";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    }

    checkSession();
  }, []);

  if (loading) return <p>Loading...</p>;

  return children;
}
