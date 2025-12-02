"use client"

import { useState } from "react";
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import LoginButton from "../_components/LoginButton"
import SignupButton from "../_components/SignupButton";


function SignupPage() {
  
  return (
    <div className="flex flex-col  justify-enter h-screen gap-4">

      <header>
        <h1 className="text-xl p-5 font-semibold text-purple-600">EstateHub</h1>
      </header>
      <div className="grid grid-cols-2 gap-14 items-center justify-center px-40 py-5">
        <div className="flex flex-col items-center text-center gap-2">
          <Image alt='property image' src={"/ahouse.jpg"} width={350} height={400} className="rounded-t-full border-t-4 border-purple-500 p-4 " ></Image>
          <h1 className="font-semibold text-2xl text-purple-950">Discover Your Dream Property and Navigate the Market</h1>
          <p className="text-gray-500 text-sm">Transform your real estate search with our smart dashboard - find the perfect property and stay ahead of trends</p>
        </div>

        {/*  */}

        <div className="flex flex-col gap-4 ">
          <h1 className="text-2xl text-purple-950 font-semibold">Create your EstateHub account</h1>
          <p className="text-sm text-gray-500">Sign up to get started</p>

          <form className="space-y-6">

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
          </form>

          <div className="flex justify-between items-center text-sm text-gray-500 ">
            <div className="flex gap-2 items-center">
              <input type="checkbox" required />
              <label htmlFor="">I agree to the terms & conditions</label>
            </div>
          </div>

          <div className="flex pt-4">
            <SignupButton/>
          </div>

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
