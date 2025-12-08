"use client";

import { useState } from "react";

import PropertyForm from "@/app/_components/PropertyForm";
import { addProperty } from "@/lib/action";
import { supabase } from "@/lib/supabase/client";


function NewProperty({ handleSubmit }) {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(null);

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true);

    const formData = new FormData(e.target);
    addProperty(formData)
  }

  


  return (
   <div className="w-full flex justify-center py-10">
    <div className="w-[60vw] bg-white shadow-sm rounded-xl p-10">
    
    {/* HEADER */}
    <div className="mb-8">
      <h1 className="text-2xl font-bold">Register your property</h1>
    </div>

    {/* FORM */}
    <form onSubmit={handleSubmit} className="space-y-6">

      <PropertyForm/>

    </form>
  </div>
</div>

  )
}

export default NewProperty
