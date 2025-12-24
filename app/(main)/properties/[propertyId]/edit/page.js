
import React from 'react'
import PropertyForm from '@/app/_components/PropertyForm';
import { getPropertyById } from '@/lib/action';

async function EditForm({params}) {
  const{ propertyId } = await params

  console.log("Fetching ID:", propertyId);
  
  const property = await getPropertyById(propertyId);
  console.log("Loaded property:", property);
  
  if (!property) {
    return <div>Property not found</div>;
  }

  return (
   <div className="w-full flex justify-center py-6 px-4 md:py-10">
    <div className="w-full md:w-[80vw] lg:w-[60vw] bg-white shadow-sm rounded-xl p-5 md:p-10">
    
    {/* HEADER */}
    <div className="mb-8">
      <h1 className="text-xl md:text-2xl font-bold">Register your property</h1>
    </div>

    {/* FORM */}
    
      <PropertyForm mode='edit' property={property}/>
  </div>
</div>
  )
}

export default EditForm
