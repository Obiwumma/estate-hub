"use client"

import { useState, useRef } from "react"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PhoneInput } from "@/components/ui/phone"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" 

export default function AccountForm({ user }) {
  const fileInputRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({}) 

  const [previewImage, setPreviewImage] = useState(user?.avatar_url)
  const [phone, setPhone] = useState(user?.phone_number || "")

  const displayName = user?.first_name || user?.last_name 
    ? `${user?.first_name || ""} ${user?.last_name || ""}`.trim()
    : "Profile Picture";

  const getInitials = (first, last) => {
    return `${first?.charAt(0) || ""}${last?.charAt(0) || ""}`.toUpperCase() || "U"
  }

  const handleImageClick = () => fileInputRef.current.click()

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB");
        return;
      }
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setIsLoading(true)

    const formData = new FormData(e.target)
    
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const dob = formData.get("dob");

    const newErrors = {};
    let hasError = false;

    if (!firstName || firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters.";
      hasError = true;
    }

    if (!lastName || lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters.";
      hasError = true;
    }

    if (!phone || phone.length < 10) {
        newErrors.phone = "Please enter a valid phone number.";
        hasError = true;
    }
    
    if (!dob) {
        newErrors.dob = "Date of Birth is required.";
        hasError = true;
    } else {
        const birthDate = new Date(dob);
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs); 
        if (Math.abs(ageDate.getUTCFullYear() - 1970) < 18) {
            newErrors.dob = "You must be at least 18 years old.";
            hasError = true;
        }
    }

    if (hasError) {
        setErrors(newErrors);
        setIsLoading(false);
        return; 
    }

    const updates = {
      id: user.id,
      first_name: firstName,
      last_name: lastName,
      company_name: formData.get("companyName"), 
      date_of_birth: dob,
      phone_number: phone,
      updated_at: new Date(),
    }

    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      alert("Error saving profile.") 
    } else {
      alert("Profile updated successfully!")
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
      
      {/* SECTION 1: IDENTITY & PHOTO */}
      <Card>
        {/* RESPONSIVE: Reduced padding on mobile (p-4) */}
        <CardContent className="p-4 md:p-6">
          
          {/* RESPONSIVE: Centered on mobile, Left-aligned on Desktop */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6">
            
            {/* Avatar */}
            <div className="relative group shrink-0">
              <Avatar className="w-20 h-20 md:w-24 md:h-24 border-2 border-gray-100">
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

            {/* Text & Button - Centered text on mobile */}
            <div className="space-y-2 flex-1 text-center sm:text-left">
              <h3 className="font-medium text-lg">{displayName}</h3>
              <p className="text-sm text-gray-500 max-w-xs mx-auto sm:mx-0">
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

          <div className="h-px bg-gray-100 my-6 md:my-8" />

          {/* Name Fields Grid - Responsive Gap */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <Label className={errors.firstName ? "text-red-500" : ""}>First Name</Label>
              <Input 
                name="firstName" 
                defaultValue={user?.first_name} 
                placeholder="e.g. Cristiano"
                className={errors.firstName ? "border-red-500" : ""} 
              />
              {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
            </div>

            <div className="space-y-2">
              <Label className={errors.lastName ? "text-red-500" : ""}>Last Name</Label>
              <Input 
                name="lastName" 
                defaultValue={user?.last_name} 
                placeholder="e.g. Ronaldo" 
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SECTION 2: PROFESSIONAL DETAILS */}
      <Card>
        <CardContent className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-medium text-lg mb-2 md:mb-4">Professional Details</h3>
          </div>

          <div className="space-y-2">
            <Label>Company Name</Label>
            <Input name="companyName" defaultValue={user?.company_name} placeholder="e.g. EstateHub Realty" />
          </div>

           <div className="space-y-2">
            <Label className={errors.dob ? "text-red-500" : ""}>Date of Birth</Label>
            <Input 
                type="date" 
                name="dob" 
                defaultValue={user?.date_of_birth} 
                className={errors.dob ? "border-red-500" : ""}
            />
            {errors.dob && <p className="text-xs text-red-500">{errors.dob}</p>}
          </div>
        </CardContent>
      </Card>

      {/* SECTION 3: CONTACT INFO */}
      <Card>
        <CardContent className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-medium text-lg mb-2 md:mb-4">Contact Information</h3>
          </div>

          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input defaultValue={user?.email} disabled className="bg-gray-50 text-gray-500 cursor-not-allowed" />
            <p className="text-xs text-gray-400 mt-1">Contact support to change your email.</p>
          </div>

          <div className="space-y-2">
            <Label className={errors.phone ? "text-red-500" : ""}>Phone Number</Label>
            <PhoneInput 
              value={phone} 
              onChange={setPhone} 
              defaultCountry="NG" 
              className={`w-full ${errors.phone ? "border-red-500 rounded-md" : ""}`}
            />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
          </div>
        </CardContent>
      </Card>

      {/* SUBMIT BUTTON - Full width on mobile, right aligned on desktop */}
      <div className="flex flex-col md:flex-row justify-end pt-4 pb-10">
        <Button 
          type="submit" 
          size="lg" 
          disabled={isLoading}
          className="bg-purple-600 hover:bg-purple-700 text-white w-full md:w-auto min-w-[150px]"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

    </form>
  )
}