"use client"

import { useEffect, useState } from "react";
import { createServerSupabaseClient } from "@/lib/supabase/server.server";
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import { deleteProperty } from "@/lib/action";

function PropertiesList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createServerSupabaseClient()


  async function deleteProperty(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this property?");
    if (!confirmDelete) return;
  
    // 1. Delete from Supabase
    const { error } = await supabase
      .from("properties")
      .delete()
      .eq("id", id);
  
    if (error) {
      console.error("Error deleting:", error);
      alert("Could not delete property");
    } else {
      // 2. If successful, remove it from the screen immediately
      // This filters out the property with the matching ID
      setProperties((prevProperties) => prevProperties.filter((p) => p.id !== id));
      
      // alert("Deleted successfully");
    }
  }

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("properties")
        .select("*");

      setProperties(data || []);
      setLoading(false);
    }

    load();
  }, []);

  console.log(properties);
  

  if (loading) return <p>Loading...</p>;

  return (
    <div className='text-gray-800'>
      <header className='flex justify-between'>
        <span className='text-2xl font-bold'>Properties</span>
        <Button className="bg-purple-600 text-white rounded px-5 py-5 " > + Add Property</Button>
      </header>

      <nav className='bg-white p-6 flex gap-10 rounded-xl mt-5 mb-10'>
        <div>
          <Select name="status">
                <SelectTrigger className="rounded border-gray-300">
                  <SelectValue placeholder="Rent Property" />
                </SelectTrigger>
                <SelectContent className="bg-white" >
                  <SelectItem value="For Sale">For Sale</SelectItem>
                  <SelectItem value="Rented">Rented</SelectItem>
                </SelectContent>
              </Select>
        </div>
        <div>
          <Select name="status"  >
                <SelectTrigger className="rounded border-gray-300">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent className="bg-white" >
                  <SelectItem value="For Sale">For Sale</SelectItem>
                  <SelectItem value="Rented">Rented</SelectItem>
                </SelectContent>
              </Select>
        </div>
        <div>
          <Select name="status">
                <SelectTrigger className="rounded border-gray-300">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent className="bg-white" >
                  <SelectItem value="For Sale">For Sale</SelectItem>
                  <SelectItem value="Rented">Rented</SelectItem>
                </SelectContent>
              </Select>
        </div>
        <div>
          <Button className="bg-purple-600 text-white rounded px-5 py-4 " >Search</Button>
        </div>
      </nav>

      <main>
        <div className='grid grid-cols-4 gap-10 justify-evenly'>

          {properties.map((p) => (

            <Card className="min-w-52" key={p.id} >
              <CardHeader><Image  src={JSON.parse(p.image_url)[0]} alt='A house' width={200} height={200} ></Image> </CardHeader>
              <CardContent>{p.title}</CardContent>
              <CardContent>{p.location}</CardContent>
              {/* <div className='flex'>
                <CardFooter>3 bedrooms </CardFooter>
                <CardFooter>2 bathrooms</CardFooter>
              </div> */}
              <hr />
              <CardContent className="flex text-xs justify-between" >${p.price} Read More <button onClick={() => deleteProperty(p.id)} >Delete</button></CardContent> 
              
            </Card>
          ))}

          <Card className="min-w-52" >
            <CardHeader><Image  src={"/ahouse.jpg"} alt='A house' width={200} height={200} ></Image> </CardHeader>
            <CardContent>St.George Bayfont</CardContent>
            <CardContent>Washington DC</CardContent>
            {/* <div className='flex'>
              <CardFooter>3 bedrooms </CardFooter>
              <CardFooter>2 bathrooms</CardFooter>
            </div> */}
            <hr />
            <CardContent>$4000 Read More</CardContent>
          </Card>

        </div>
      </main>
    </div>
  )
}

export default PropertiesList
