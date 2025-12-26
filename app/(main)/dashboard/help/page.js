"use client"

import { Card, CardContent } from "@/components/ui/card"
// Using FontAwesome icons from react-icons
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa"
import Link from "next/link"

export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto py-6 px-4 md:py-10 md:px-6">
      
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Help & Support</h1>
        <p className="text-gray-500 mt-2">
          Need assistance with the platform?
        </p>
      </div>

      {/* CONTACT CARD */}
      <Card className="py-8 md:py-12 border-dashed border-2 shadow-sm bg-white">
        <CardContent className="flex flex-col items-center text-center gap-6">
          
          {/* Main Message */}
          <div className="space-y-2">
            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
               <FaEnvelope className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Contact the Developer
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              If you&apos;re running into bugs, need a feature, or just want to say hi, feel free to reach out directly.
            </p>
          </div>

          {/* Social Links Row */}
          <div className="flex items-center gap-4 md:gap-6 mt-4">
             
             {/* Email */}
             <SocialLink 
               href="mailto:pobiwumma@gmail.com" 
               icon={<FaEnvelope size={24} />} 
               label="Email" 
             />

             {/* GitHub */}
             <SocialLink 
               href="https://github.com/Obiwumma" 
               icon={<FaGithub size={24} />} 
               label="GitHub" 
             />

             {/* Twitter / X */}
             <SocialLink 
               href="https://x.com/Pascal_FTM" 
               icon={<FaTwitter size={24} />} 
               label="Twitter" 
             />

             {/* LinkedIn */}
             <SocialLink 
               href="https://www.linkedin.com/in/pascal-obiwumma" 
               icon={<FaLinkedin size={24} />} 
               label="LinkedIn" 
             />

          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Reusable Sub-Component
function SocialLink({ href, icon, label }) {
  return (
    <Link 
      href={href} 
      target="_blank"
      className="p-4 rounded-full bg-gray-50 text-gray-600 hover:bg-purple-600 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md"
      aria-label={label}
    >
      {icon}
    </Link>
  )
}