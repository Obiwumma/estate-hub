
import React from 'react'
import { createServerSupabaseClient } from '@/lib/supabase/server.server';
import PropertyForm from '@/app/_components/PropertyForm';
import { updateProperty } from '@/lib/action';

async function EditForm({params}) {
  const supabase = createServerSupabaseClient()

  const {data: property} = await supabase
  .from("properties")
  .select("*")
  .eq("id", params.propertyId)
  .single();

  // if (error) console.log(error);

  return (
   <div className="w-full flex justify-center py-10">
    <div className="w-[60vw] bg-white shadow-sm rounded-xl p-10">
    
    {/* HEADER */}
    <div className="mb-8">
      <h1 className="text-2xl font-bold">Register your property</h1>
    </div>

    {/* FORM */}
    
      <PropertyForm mode='edit' property={property}/>
  </div>
</div>
  )
}

export default EditForm
