"use client"

import { useState } from "react";
import Image from "next/image"
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import LoginButton from "../../_components/LoginButton"
import { signUp } from "@/lib/action";

function SignupPage() {
  const [serverError, setServerError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({}); // Stores field-specific errors
  const [isLoading, setIsLoading] = useState(false);  // Stores loading state
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");
    setFieldErrors({});
    setIsLoading(true);

    const formData = new FormData(e.target);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const fullName = formData.get("fullName");

    // --- 1. CLIENT-SIDE VALIDATION ---
    const errors = {};
    let hasError = false;

    // Check Password Match
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      hasError = true;
    }

    // Check Password Length
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      hasError = true;
    }

    // Check Name Length
    if (fullName.length < 2) {
      errors.fullName = "Please enter a valid full name";
      hasError = true;
    }

    // If validation fails, stop here
    if (hasError) {
      setFieldErrors(errors);
      setIsLoading(false);
      return;
    }

    // --- 2. SERVER ACTION ---
    const res = await signUp(formData);

    if (res?.error) {
      setServerError(res.error);
    } else {
      // Success!
      router.push("/auth/login");
    }
    
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col justify-enter h-screen gap-4">

      <header>
        <div className="md:hidden">
          <Image src="/EstateHub_Logo2.png" width={100} height={50} alt="Logo" className="w-auto h-16 my-4" />
        </div>
      </header>

      {/* Grid Layout (Responsive Fixes Included) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center justify-center px-6 md:px-20 lg:px-40 py-10 md:py-5">
        
        {/* Left Side: Image (Hidden on Mobile) */}
        <div className="hidden md:flex flex-col items-center text-center gap-2">
          <Image alt='property image' src={"/ahouse.jpg"} width={350} height={400} className="rounded-t-full border-t-4 border-purple-500 p-4 " />
          <h1 className="font-semibold text-2xl text-purple-950">Discover Your Dream Property and Navigate the Market</h1>
          <p className="text-gray-500 text-sm">Transform your real estate search with our smart dashboard.</p>
        </div>

        {/* Right Side: Form */}
        <div className="flex flex-col gap-4">
          <h1 className="text-xl md:text-2xl text-purple-950 font-semibold">Create your EstateHub account</h1>
          <p className="text-sm text-gray-500">Sign up to get started</p>

          {/* Global Server Error Message */}
          {serverError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
              {serverError}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-purple-950">Full Name</label>
              <Input
                name="fullName"
                type="text"
                placeholder="John Doe"
                className={`mt-1 border-gray-300 ${fieldErrors.fullName ? "border-red-500" : ""}`}
                required
              />
              {fieldErrors.fullName && <p className="text-xs text-red-500 mt-1">{fieldErrors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-purple-950">Your Email</label>
              <Input
                name="email"
                type="email"
                placeholder="johndoe@email.com"
                className="mt-1 border-gray-300"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-purple-950">Password</label>
              <Input
                name="password"
                type="password"
                placeholder="*******"
                className={`mt-1 border-gray-300 ${fieldErrors.password ? "border-red-500" : ""}`}
                required
              />
              {fieldErrors.password && <p className="text-xs text-red-500 mt-1">{fieldErrors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium text-purple-950">Confirm Password</label>
              <Input
                name="confirmPassword"
                type="password"
                placeholder="*******"
                className={`mt-1 border-gray-300 ${fieldErrors.confirmPassword ? "border-red-500" : ""}`}
                required
              />
              {fieldErrors.confirmPassword && <p className="text-xs text-red-500 mt-1">{fieldErrors.confirmPassword}</p>}
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
              <div className="flex gap-2 items-center">
                <input type="checkbox" required />
                <label>I agree to the terms & conditions</label>
              </div>
            </div>

            <div className="flex pt-4">
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="bg-purple-600 text-white px-6 py-5 hover:bg-purple-700 rounded w-full disabled:bg-purple-300"
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>
            </div>
          </form>

          <div className="flex items-center justify-center">
            <p className="text-sm text-gray-400">or</p>
          </div>

          <LoginButton />

          <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/auth/login" className="font-bold text-purple-600 hover:text-purple-500 hover:underline">
                  Login
                </Link>
              </p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage;