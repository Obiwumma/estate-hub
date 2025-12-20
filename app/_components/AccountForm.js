"use client"

import { useState, useRef } from "react"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PhoneInput } from "@/components/ui/phone" // Ensure you have this installed
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" // Optional Shadcn Avatar

export default function AccountForm({ user }) {
  const fileInputRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  
  // State
  const [previewImage, setPreviewImage] = useState(user?.avatar_url)
  const [phone, setPhone] = useState(user?.phone_number || "")

  // Helpers
  const getInitials = (first, last) => {
    return `${first?.charAt(0) || ""}${last?.charAt(0) || ""}`.toUpperCase() || "U"
  }

  const handleImageClick = () => fileInputRef.current.click()

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) setPreviewImage(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.target)
    
    const updates = {
      id: user.id,
      first_name: formData.get("firstName"),
      last_name: formData.get("lastName"),
      company_name: formData.get("companyName"),
      date_of_birth: formData.get("dob"),
      phone_number: phone,
      updated_at: new Date(),
    }

    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      alert("Error saving profile.") // Replace with toast if available
    } else {
      alert("Profile updated successfully!")
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* SECTION 1: IDENTITY & PHOTO */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            
            {/* Avatar Section */}
            <div className="relative group">
              <Avatar className="w-24 h-24 border-2 border-gray-100">
                <AvatarImage src={previewImage} className="object-cover" />
                <AvatarFallback className="bg-purple-100 text-purple-700 text-xl font-bold">
                  {getInitials(user?.first_name, user?.last_name)}
                </AvatarFallback>
              </Avatar>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*" 
              />
            </div>

            {/* Text & Button */}
            <div className="space-y-2 flex-1">
              <h3 className="font-medium text-lg">Profile Picture</h3>
              <p className="text-sm text-gray-500">
                Upload a professional photo. Recommended size: 500x500px.
              </p>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={handleImageClick}
                className="mt-2"
              >
                Upload New Image
              </Button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100 my-8" />

          {/* Name Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input name="firstName" defaultValue={user?.first_name} placeholder="e.g. Cristiano" />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input name="lastName" defaultValue={user?.last_name} placeholder="e.g. Ronaldo" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SECTION 2: PROFESSIONAL DETAILS */}
      <Card>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-medium text-lg mb-4">Professional Details</h3>
          </div>

          <div className="space-y-2">
            <Label>Company Name</Label>
            <Input name="companyName" defaultValue={user?.company_name} placeholder="e.g. EstateHub Realty" />
          </div>

           <div className="space-y-2">
            <Label>Date of Birth</Label>
            <Input type="date" name="dob" defaultValue={user?.date_of_birth} />
          </div>
        </CardContent>
      </Card>

      {/* SECTION 3: CONTACT INFO */}
      <Card>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-medium text-lg mb-4">Contact Information</h3>
          </div>

          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input defaultValue={user?.email} disabled className="bg-gray-50 text-gray-500 cursor-not-allowed" />
            <p className="text-xs text-gray-400 mt-1">Contact support to change your email.</p>
          </div>

          <div className="space-y-2">
            <Label>Phone Number</Label>
            <PhoneInput 
              value={phone} 
              onChange={setPhone} 
              defaultCountry="NG" 
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* SUBMIT BUTTON AREA */}
      <div className="flex justify-end pt-4 pb-10">
        <Button 
          type="submit" 
          size="lg" 
          disabled={isLoading}
          className="bg-purple-600 hover:bg-purple-700 text-white min-w-[150px]"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

    </form>
  )
}