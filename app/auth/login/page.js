"use client"

import { useState } from "react";

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import LoginButton from "../../_components/LoginButton"
import { signIn } from "@/lib/action";
import { useRouter } from "next/navigation";


function LoginPage() {
  const [message, setMessage] = useState("");
  const router = useRouter()


  async function handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData(e.target);
    const res = await signIn(formData);
    
    if (res.error) {
    setMessage(res.error);
  } else {
    setMessage("Signin successful! ...");
    router.push("/dashboard")
  }
  console.log(message);

    
  }
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
          <h1 className="text-2xl text-purple-950 font-semibold">Welcome back to EstateHub!</h1>
          <p className="text-sm text-gray-500">Sign into you account</p>

          <form  className="space-y-6" onSubmit={handleSubmit}>
          
                {/* sign in field */}
                <div>
                  <label className="text-sm font-medium text-purple-950">Your Email</label>
                  <Input
                    name="email"
                    type={"email"}
                    placeholder="johndoe@email.com"
                    className="mt-1 border-gray-300 placeholder:text-gray-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-purple-950">Password</label>
                  <Input
                    name="password"
                    type={"password"}
                    placeholder="*******"
                    className="mt-1 border-gray-300 placeholder:text-gray-500"
                    required
                  />
                </div>

            <div className="flex justify-between items-center text-sm text-gray-500 ">
              <div className="flex gap-2 items-center">
                <input type="checkbox" />
                <label htmlFor="">Remember me</label>
              </div>
              <span>Forgot Password?</span>
            </div>

            <div className="flex -center pt-4">
              <Button type="submit" className="bg-purple-600 text-white px-6 py-5 hover:bg-purple-700 rounded w-full">
                Login
              </Button>

            </div>

            <div className="flex items-center justify-center">
              <p>or</p>
            </div>

          </form>   
          
          <LoginButton/>
          

        </div>
       
      </div>
    </div>
  )
}

export default LoginPage
