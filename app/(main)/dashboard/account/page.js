"use client"

import AccountForm from "@/app/_components/AccountForm"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

function MyAccount() {

  const router = useRouter()
  
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function getUserData() {
      // Get User from Browser Session
      const { data: { user }, error } = await supabase.auth.getUser()

      if (error || !user) {
        console.log("No user found, redirecting...")
        router.push("/auth/login") // Use router.push for client redirects
        return
      }

      // Get Profile Data
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      // Combine Data
      const userData = {
        id: user.id,
        email: user.email,
        first_name: profile?.first_name || user.user_metadata?.full_name?.split(' ')[0] || "",
        last_name: profile?.last_name || user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || "",
        company_name: profile?.company_name || "",
        phone_number: profile?.phone_number || "",
        date_of_birth: profile?.date_of_birth || "",
        avatar_url: profile?.avatar_url || user.user_metadata?.avatar_url,
      }

      setUser(userData)
      setLoading(false)
    }

    getUserData()
  }, [router, supabase])

  if (loading) {
    return <div className="p-6">Loading account details...</div>
  }

  return (
    <div>
      <AccountForm user={user}/>
    </div>
  )
}

export default MyAccount
