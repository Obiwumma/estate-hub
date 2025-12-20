"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client" // Your singleton import
import AccountForm from "@/app/_components/AccountForm" // Adjust path as needed

export default function AccountPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function getUserData() {
      // 1. Get User Session
      const { data: { user }, error } = await supabase.auth.getUser()

      if (error || !user) {
        router.push("/auth/login")
        return
      }

      // 2. Get Profile Data
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      // 3. Format Data
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
  }, [router])

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-96 w-full bg-gray-100 animate-pulse rounded-xl"></div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Account Settings</h1>
        <p className="text-gray-500 mt-2">
          Manage your profile information and how you appear on EstateHub.
        </p>
      </div>
      
      {/* The Form Component */}
      <AccountForm user={user} />
    </div>
  )
}