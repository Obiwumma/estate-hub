"use client"

import { useState } from "react";
import Image from "next/image"
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import LoginButton from "../../_components/LoginButton"
import { signIn } from "@/lib/action";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // 1. Add Loading State
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage("");        // Clear previous errors
    setIsLoading(true);    // Start loading

    const formData = new FormData(e.target);
    const res = await signIn(formData);
    
    if (res?.error) {
      setMessage(res.error);
    } else {
      // Success!
      router.push("/dashboard");
    }

    setIsLoading(false); // Stop loading
  }

  return (
    <div className="flex flex-col justify-enter h-screen gap-4">

      <header>
        <div className="md:hidden">
          <Image src="/EstateHub_Logo2.png" width={100} height={50} alt="Logo" className="w-auto h-16 my-4" />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center justify-center px-6 md:px-20 lg:px-40 py-5">
        
        {/* Image Section (Hidden on Mobile) */}
        <div className="hidden sm:flex flex-col items-center text-center gap-2">
          <Image alt='property image' src={"/ahouse.jpg"} width={350} height={400} className="rounded-t-full border-t-4 border-purple-500 p-4 " />
          <h1 className="font-semibold text-xl md:text-2xl text-purple-950">Discover Your Dream Property and Navigate the Market</h1>
          <p className="text-gray-500 text-sm">Transform your real estate search with our smart dashboard - find the perfect property and stay ahead of trends</p>
        </div>

        {/* Form Section */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl text-purple-950 font-semibold">Welcome back to EstateHub!</h1>
          <p className="text-sm text-gray-500">Sign into your account</p>

          {/* 2. Error Message Alert */}
          {message && (
             <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
               {message}
             </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
          
            {/* Email Field */}
            <div>
              <label className="text-sm font-medium text-purple-950">Your Email</label>
              <Input
                name="email"
                type="email"
                placeholder="johndoe@email.com"
                className="mt-1 border-gray-300 placeholder:text-gray-500"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="text-sm font-medium text-purple-950">Password</label>
              <Input
                name="password"
                type="password"
                placeholder="*******"
                className="mt-1 border-gray-300 placeholder:text-gray-500"
                required
              />
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500 ">
              <div className="flex gap-2 items-center">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <span className="cursor-pointer hover:text-purple-600">Forgot Password?</span>
            </div>

            <div className="flex pt-4">
              {/* 3. Button with Loading State */}
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="bg-purple-600 text-white px-6 py-5 hover:bg-purple-700 rounded w-full disabled:bg-purple-300"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>

            <div className="flex items-center justify-center">
              <p className="text-gray-400 text-sm">or</p>
            </div>

          </form>   
          
          <LoginButton/>

          <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <Link href="/auth/signup" className="font-bold text-purple-600 hover:text-purple-500 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>

        </div>
       
      </div>
    </div>
  )
}

export default LoginPage