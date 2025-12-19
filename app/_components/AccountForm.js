"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PhoneInput } from "@/components/ui/phone" // Ensure you have this installed
import { useRef, useState } from "react"

export default function AccountForm({ user }) {
  // Reference to trigger the hidden file input
  const fileInputRef = useRef(null)
  
  // Optional: State to show a preview if they select a new image immediately
  const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
  const [previewImage, setPreviewImage] = useState(user?.avatar_url || defaultImage)

  const displayName = user?.first_name && user?.last_name 
    ? `${user.first_name} ${user.last_name}` 
    : user?.email || "Your Profile";

  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  return (
    <div className="space-y-8">
      
      {/* --- HEADER: PROFILE PICTURE --- */}
      <header className="flex flex-col sm:flex-row border border-gray-200 p-6 rounded-xl items-center gap-8 bg-white shadow-sm">
        <div className="relative shrink-0">
          <img
            src={previewImage}
            width={80}
            height={80}
            className="rounded-full object-cover aspect-square border-2 border-purple-100"
            alt="Profile"
          />
        </div>
        
        <div className="flex flex-col gap-2 text-center sm:text-left w-full">
          <h1 className="text-lg font-bold text-gray-900">{displayName}</h1>
          <p className="text-sm text-gray-500">
            {user?.email || "No email found"}
          </p>
          
          <div className="mt-1">
            {/* Hidden Input for File Upload */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange}
              className="hidden" 
              accept="image/*"
            />
            <Button 
              onClick={handleImageClick}
              type="button" 
              className="bg-purple-600 hover:bg-purple-500 text-white"
            >
              Upload New
            </Button>
          </div>
        </div>
      </header>

      {/* --- MAIN FORM --- */}
      <main className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
        <form className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-6">
          
          {/* FIRST NAME */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">First Name</Label>
            <Input
              name="firstName"
              placeholder="e.g. Cristiano"
              className="border-gray-300 focus-visible:ring-purple-500"
            />
          </div>

          {/* LAST NAME */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Last Name</Label>
            <Input
              name="lastName"
              placeholder="e.g. Ronaldo"
              className="border-gray-300 focus-visible:ring-purple-500"
            />
          </div>

          {/* COMPANY NAME */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Company Name</Label>
            <Input
              name="companyName"
              placeholder="e.g. CR7 Agency"
              className="border-gray-300 focus-visible:ring-purple-500"
            />
          </div>

          
          {/* EMAIL (Read Only) */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
               <Label className="text-sm font-medium">Email</Label>
               <span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">Read Only</span>
            </div>
            <Input
              name="email"
              type="email"
              defaultValue="ronaldo@example.com"
              disabled
              className="bg-gray-50 text-gray-500 border-gray-200 cursor-not-allowed"
            />
          </div>

          {/* PHONE */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Phone Number</Label>
            <PhoneInput
              defaultCountry="NG"
              placeholder="812 345 6789"
              className="border-gray-300 focus-within:border-purple-500"
            />
          </div>

          {/* SAVE BUTTON */}
          <div className="col-span-1 lg:col-span-2 flex justify-end mt-4 pt-4 border-t border-gray-100">
             <Button type="submit" size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
               Save Changes
             </Button>
          </div>

        </form>
      </main>
    </div>
  )
}