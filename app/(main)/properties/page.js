"use client"

import { useEffect, useState } from "react";
import { createServerSupabaseClient } from "@/lib/supabase/server.server";
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import { deleteProperty } from "@/lib/action";
import Link from "next/link";

function PropertiesList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [finalInput, setFinalInput] = useState("")
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
      let query = supabase
        .from("properties")
        .select("*")

        if (filter == "sale") query.eq("status", "sale")
          else if (filter == "rent") query.eq("status", "rent")
            else query.in("status", ['sale', 'rent'])

        if (search) query.ilike("title", `%${search}%`)

      const { data } = await query

      // const { data } = await supabase
      //   .from("properties")
      //   .select("*")
      //   .in('status', ['sale', 'rent']);

      setProperties(data || []);
      setLoading(false);
    }

    load();
  }, [filter, finalInput]);

  useEffect(() => {
    const theOutput = setTimeout(() => {
      setFinalInput(search)
    }, 500);

    return () => {
    clearTimeout(theOutput); // This cancels the previous timer
  };
  }, [search])


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
          <Select  name="status" onValueChange={(val) => setFilter(val)}>
                <SelectTrigger className="rounded min-w-28 border-gray-300">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent className="bg-white" >
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="sale">For Sale</SelectItem>
                  <SelectItem value="rent">For Rent</SelectItem>
                </SelectContent>
              </Select>
        </div>
        <div>
          <div className="flex w-full max-w-sm items-center gap-2">
            <Input type="text" placeholder="Search for property..." onChange={(e) => setSearch(e.target.value)} className="rounded min-w-28 border-gray-300" />
            <Button  className="bg-purple-600  text-white rounded px-5 py-4 " type="submit" variant="outline">
              Search
            </Button>
          </div>
          
        </div>
      </nav>

      <main>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
          {properties.map((p) => {
            // Safety check for images
            const images = p.image_url ? JSON.parse(p.image_url) : [];
            const mainImage = images[0] || '/placeholder.jpg';

            return (
              <Card className="min-w-52 hover:shadow-lg transition-shadow" key={p.id}>
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full">
                     <Image 
                       src={mainImage} 
                       alt={p.title} 
                       fill 
                       className="object-cover rounded-t-xl"
                     />
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <h3 className="font-bold text-lg truncate">{p.title}</h3>
                  <p className="text-gray-500 text-sm">{p.location}</p>
                </CardContent>
                <hr />
                <CardContent className="flex items-center justify-between p-4">
                  <span className="font-bold text-purple-600">${p.price}</span>
                  
                  {/* LINK TO DETAIL PAGE */}
                  <Link href={`/properties/${p.id}`}>
                    <button className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded">
                      Read More
                    </button>
                  </Link>
                </CardContent> 
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default PropertiesList
