"use client"

import { useState } from "react";
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import LoginButton from "../../_components/LoginButton"
import { signUp } from "@/lib/action";


function SignupPage() {
  const [message, setMessage] = useState("");
  const router = useRouter()

  async function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const res = await signUp(formData);

  if (res.error) {
    setMessage(res.error);
  } else {
    setMessage("Signup successful! Please check your email.");
    router.push("/login")
  }
  console.log(message);
  
}
  return (
    <div className="flex flex-col  justify-enter h-screen gap-4">

      <header>
        <div className="md:hidden">
          <Image src="/EstateHub_Logo2.png" width={100} height={50} alt="Logo" className="w-auto h-16 my-4" />
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center justify-center px-6 md:px-20 lg:px-40 py-10 md:py-5">
        <div className="hidden md:flex flex-col items-center text-center gap-2">
          <Image alt='property image' src={"/ahouse.jpg"} width={350} height={400} className="rounded-t-full border-t-4 border-purple-500 p-4 " ></Image>
          <h1 className="font-semibold text-xl md:text-2xl text-purple-950">Discover Your Dream Property and Navigate the Market</h1>
          <p className="text-gray-500 text-sm">Transform your real estate search with our smart dashboard - find the perfect property and stay ahead of trends</p>
        </div>

        {/*  */}

        <div className="flex flex-col gap-4 ">
          <h1 className="text-2xl text-purple-950 font-semibold">Create your EstateHub account</h1>
          <p className="text-sm text-gray-500">Sign up to get started</p>

          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* full name */}
            <div>
              <label className="text-sm font-medium text-purple-950">Full Name</label>
              <Input
                name="fullName"
                type="text"
                placeholder="John Doe"
                className="mt-1 border-gray-300 placeholder:text-gray-500"
                required
              />
            </div>

              {/* email */}
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

              {/* password */}
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

              {/* confirm password */}
              <div>
                <label className="text-sm font-medium text-purple-950">Confirm Password</label>
                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="*******"
                  className="mt-1 border-gray-300 placeholder:text-gray-500"
                  required
                />
              </div>

            <div className="flex justify-between items-center text-sm text-gray-500 ">
              <div className="flex gap-2 items-center">
                <input type="checkbox" required />
                <label htmlFor="">I agree to the terms & conditions</label>
              </div>
            </div>

            <div className="flex pt-4">
              <button type="submit" className="bg-purple-600 text-white px-4 py-4 hover:bg-purple-700 rounded w-full">
                Sign Up
              </button>
            </div>
          </form>

          <div className="flex items-center justify-center">
            <p>or</p>
          </div>

          <LoginButton />
        </div>
       
      </div>
    </div>
  )
}

export default SignupPage;
