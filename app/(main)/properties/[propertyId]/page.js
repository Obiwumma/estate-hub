'use client'
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // To get the ID from URL
import { supabase } from '@/lib/supabase/client';
import Image from 'next/image';
import LeadGate from '@/app/_components/LeadGate';

export default function PropertyDetail() {
  const { propertyId } = useParams(); // Matches the folder name [propertyId]
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperty() {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', propertyId)
        .single(); // We expect only one result

      if (error) console.error("Error fetching:", error);
      setProperty(data);
      setLoading(false);
    }

    if (propertyId) fetchProperty();
  }, [propertyId]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-6">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-96 w-full bg-gray-100 animate-pulse rounded-xl"></div>
      </div>
    )
  }
  if (!property) return <div>Property not found</div>;

  const images = property.image_url ? JSON.parse(property.image_url) : [];

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6">
      {/* 1. Image Section */}
      <div className="h-64 md:h-96 mb-6 md:mb-8 relative w-full rounded-2xl overflow-hidden">
        <Image 
          src={images[0] || '/placeholder.jpg'} 
          alt={property.title} 
          fill 
          className="object-cover" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* 2. Main Details */}
        <div className="col-span-2">
          <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
          <p className="text-gray-500 mb-4">{property.location}</p>
          <div className="text-2xl font-bold text-purple-600 mb-6">
            ${property.price} <span className="text-sm text-gray-400 font-normal">/ {property.status}</span>
          </div>
          
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{property.description}</p>
          </div>
        </div>

        {/* 3. The Sidebar / Lead Gate */}
        <div className="col-span-1">
            <div className="bg-white p-6 shadow-xl rounded-xl border border-gray-100 sticky top-10">
                <p className="text-gray-500 text-sm mb-4">Interested in this property?</p>
                
                {/* INSERT THE MONEY FEATURE HERE */}
                <LeadGate 
                    agentName={property.contact_name || "Estate Agent"} 
                    agentPhone={property.contact_phone} 
                    agentEmail={property.contact_email} 
                />
            </div>
        </div>
      </div>
    </div>
  );
}