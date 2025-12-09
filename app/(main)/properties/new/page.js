"use client";

import { useState } from "react";

import PropertyForm from "@/app/_components/PropertyForm";
import { addProperty } from "@/lib/action";
import { supabase } from "@/lib/supabase/client";


function NewProperty({ }) {
  


  return (
   <div className="w-full flex justify-center py-10">
    <div className="w-[60vw] bg-white shadow-sm rounded-xl p-10">
    
    {/* HEADER */}
    <div className="mb-8">
      <h1 className="text-2xl font-bold">Register your property</h1>
    </div>

    {/* FORM */}
      <PropertyForm mode="create"/>

  
  </div>
</div>

  )
}

export default NewProperty
