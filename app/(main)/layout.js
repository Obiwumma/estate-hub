"use client";

import { useState, useEffect } from "react"; // 1. Import useState & useEffect
import LogoutButton from "../_components/LogoutButton";
import Link from "next/link";
import ActiveLink from "../_components/ActiveLink";
import AuthGuard from "../_components/AuthGuard";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline, IoMenu } from "react-icons/io5";
import Image from "next/image";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetHeader, 
  SheetTitle,
  SheetDescription 
} from "@/components/ui/sheet";

export default function DashboardLayout({ children }) {
  
  // 2. Add State to control the menu manually
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 3. THE FIX: Close menu automatically if screen becomes large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // 768px is the 'md' breakpoint
        setIsMobileMenuOpen(false);
      }
    };

    // Listen for resize events
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // Reusable Sidebar Content
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
       <div className="mb-8">
          <Image 
            src="/EstateHub_Logo2.png"
            width={150}
            height={40}
            alt="EstateHub_logo"
            className="w-auto h-auto"
          />
       </div>
       <div className="flex-1 flex flex-col justify-between">
         <ul className="grid gap-4">
           {/* Note: Clicking a link should also close the menu on mobile */}
           <li onClick={() => setIsMobileMenuOpen(false)}><ActiveLink href="/dashboard">Dashboard</ActiveLink></li>
           <li onClick={() => setIsMobileMenuOpen(false)}><ActiveLink href="/properties">Properties</ActiveLink></li>
           <li onClick={() => setIsMobileMenuOpen(false)}><ActiveLink href="/dashboard/account">My Account</ActiveLink></li>
           <li onClick={() => setIsMobileMenuOpen(false)}><ActiveLink href="/dashboard/help">Help & Support</ActiveLink></li>
         </ul>
         <div className="mb-4">
           <LogoutButton />
         </div>
       </div>
    </div>
  );

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gray-50">

        {/* DESKTOP SIDEBAR */}
        <aside className="hidden md:flex border-r bg-white text-gray-900 w-64 fixed left-0 top-0 h-screen p-6 flex-col z-50">
           <SidebarContent />
        </aside>

        {/* MAIN CONTENT */}
        <div className="w-full md:ml-64 transition-all duration-300 ease-in-out">
          
          <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md flex p-4 md:p-6 justify-between items-center shadow-sm border-b border-gray-100">
            
            <div className="flex items-center gap-4">
              
              {/* MOBILE MENU */}
              <div className="md:hidden">
                {/* 4. Bind the 'open' state to our variable */}
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen} >
                  <SheetTrigger asChild>
                    <button className="p-2 -ml-2 hover:bg-gray-100 rounded-md">
                      <IoMenu size={24} />
                    </button>
                  </SheetTrigger>
                  
                  <SheetContent side="left" className="w-64 p-6">
                    <SheetHeader>
                      <SheetTitle className="sr-only">Menu</SheetTitle>
                      <SheetDescription className="sr-only">Navigation</SheetDescription>
                    </SheetHeader>
                    <SidebarContent />
                  </SheetContent>
                </Sheet>
              </div>

              {/* Mobile Logo */}
              <div className="md:hidden">
                 <Image src="/EstateHub_Logo2.png" width={100} height={30} alt="Logo" className="w-auto h-8" />
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-600">
              <button className="hover:text-purple-600"><IoMdNotificationsOutline size={24} /></button>
              <Link href="/dashboard/account" className="hover:text-purple-600"><IoSettingsOutline size={22} /></Link>
            </div>
          </nav>

          <main className="p-4 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}