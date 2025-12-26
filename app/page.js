import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"; 
// Make sure you have your button component, or use standard HTML button

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      
      {/* 1. NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-12 border-b border-gray-100">
        {/* Logo */}
        <div className="flex items-center gap-2">
           {/* If you have your logo file, use it here */}
           <Image 
             src="/EstateHub_Logo2.png" 
             width={120} 
             height={60} 
             alt="EstateHub Logo" 
             className="w-auto h-10 md:h-14"
           />
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-4">
          <Link 
            href="/auth/login" 
            className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
          >
            Log in
          </Link>
          <Link href="/auth/signup">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12 md:py-24">
        
        {/* Badge */}
        <div className="bg-purple-50 text-purple-700 text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-purple-100">
          The #1 Real Estate Platform 
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6 max-w-4xl leading-tight">
          Find your dream home <br className="hidden md:block" />
          <span className="text-purple-600">without the hassle.</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
          EstateHub connects you with the best properties for sale and rent. 
          Manage your listings, track clients, and close deals faster.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/properties">
             <Button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white h-12 px-8 text-lg rounded-lg shadow-lg hover:shadow-purple-200 transition-all">
               Start Searching
             </Button>
          </Link>
          {/* <Link href="/auth/login">
             <Button variant="outline" className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50 h-12 px-8 text-lg rounded-lg">
               I am an Agent
             </Button>
          </Link> */}
        </div>

        {/* Hero Image / Dashboard Preview */}
        <div className="mt-16 w-full max-w-5xl mx-auto relative rounded-xl border border-gray-200 shadow-2xl overflow-hidden bg-gray-50">
           {/* If you don't have a dashboard screenshot, you can use your house image here */}
           <Image 
             src="/ahouse.jpg" 
             alt="App Screenshot" 
             width={1200} 
             height={600}
             className="w-full h-auto object-cover opacity-90"
             priority
           />
           
           {/* Overlay Gradient (Makes text readable if image is busy) */}
           <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
        </div>

      </main>

      {/* 3. FOOTER */}
      <footer className="border-t border-gray-100 py-8 text-center text-gray-500 text-sm bg-white">
        <p>© {new Date().getFullYear()} EstateHub. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4">
          <Link href="#" className="hover:text-purple-600">Privacy Policy</Link>
          <Link href="#" className="hover:text-purple-600">Terms of Service</Link>
        </div>
      </footer>

    </div>
  );
}