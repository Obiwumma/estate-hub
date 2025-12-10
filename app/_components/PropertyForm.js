"use client"

import { useState } from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input";
import { addProperty } from "@/lib/action";
import { updateProperty } from "@/lib/action"
import { supabase } from "@/lib/supabase/client";

function PropertyForm( { mode = "create", property } ) {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true);

    const formData = new FormData(e.target);

    if (mode === "create") {
      await addProperty(formData);
    } else if (mode === "edit") {
      formData.append("propertyId", property.id);
      await updateProperty(formData);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
      {/* PROPERTY NAME */}
      <div>
        <label className="text-sm font-medium">Property Name</label>
        <Input
          name="title"
          placeholder="Enter the name of the property..."
          className="mt-1 border-gray-300 placeholder:text-gray-500"
          required
        />
      </div>

      {/* PROPERTY ADDRESS */}
      <div>
        <label className="text-sm font-medium">Price (₦)</label>
        <Input
        type="number"
          name="price"
          placeholder="Enter the price of the property..."
          className="mt-1 border-gray-300 placeholder:text-gray-500"
          required
        />
      </div>

      {/* Price */}
      <div>
        <label className="text-sm font-medium">Property Address</label>
        <Input
          name="location"
          placeholder="Enter the address of the property..."
          className="mt-1 border-gray-300 placeholder:text-gray-500"
          required
        />
      </div>

      {/* PROPERTY TYPE */}
      <div>
        <label className="text-sm font-medium">Property Type</label>
        <Select name="status">
          <SelectTrigger className="mt-1 border-gray-300 placeholder:text-gray-500">
            <SelectValue  placeholder="Select the type of property (For Sale, Rented)..." />
          </SelectTrigger>
          <SelectContent className="bg-white ">
            
            <SelectItem value="Sale">For Sale</SelectItem>
            <SelectItem value="Rented">Rented</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* DATES */}
      {/* <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium">Date of Purchase</label>
          <Input type="date" name="purchaseDate" className="mt-1 border-gray-300" />
        </div>

        <div>
          <label className="text-sm font-medium">Date of Last Renovation</label>
          <Input type="date" name="renovationDate" className="mt-1" />
        </div>
      </div> */}

      {/* DESCRIPTION */}
      <div>
        <label className="text-sm font-medium">Description</label>
        <Textarea
          name="description"
          placeholder="Write a brief description of the property, including any notable features or history..."
          className="mt-1 border-gray-300 placeholder:text-gray-500"
          required
        />
      </div>

      {/* IMAGES */}
      <div>
        <label className="text-sm font-medium">Property Images</label>

        <div className="grid  mt-2">
          <Input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={(e) => setImages(e.target.files)}
            className="border-dashed text-gray-500 border-gray-500 pt-10 pb-14 h-[140px]"
          />

        </div>

        <p className="text-sm text-gray-500 mt-1">You can upload multiple images.</p>
      </div>

      {/* BUTTONS */}
      <div className="flex justify-end pt-4">
        <Button className="bg-purple-600 text-white px-6 py-2 hover:bg-purple-700 rounded">
          Register property
        </Button>

      </div>
      </div>
    </form>
  )
}

export default PropertyForm
