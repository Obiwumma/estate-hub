"use client"

import { useState } from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input";
import { addProperty, updateProperty } from "@/lib/action"; // Consolidated import

function PropertyForm({ mode = "create", property }) {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true);

    const formData = new FormData(e.target);

    // If editing, we must append the ID so the backend knows which row to update
    if (mode === "edit" && property?.id) {
      formData.append("id", property.id);
      await updateProperty(formData);
    } else {
      await addProperty(formData);
    }
    
    setLoading(false); // Stop loading if it fails or after redirect logic (if handled in action)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* 1. PROPERTY NAME */}
      <div>
        <label className="text-sm font-medium">Property Name</label>
        <Input
          name="title"
          defaultValue={property?.title || ""}
          placeholder="Enter the name of the property..."
          className="mt-1 border-gray-300 placeholder:text-gray-500"
          required
        />
      </div>

      {/* 2. PRICE & STATUS (Grid Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Price (₦)</label>
          <Input
            type="number"
            name="price"
            defaultValue={property?.price || ""}
            placeholder="Enter price..."
            className="mt-1 border-gray-300 placeholder:text-gray-500"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Property Status</label>
          {/* Note: Shadcn Select usually needs a hidden input for FormData or controlled state */}
          <Select name="status" defaultValue={property?.status || "sale"}>
            <SelectTrigger className="mt-1 border-gray-300 placeholder:text-gray-500">
              <SelectValue placeholder="Select status..." />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="sale"> For Sale</SelectItem>
              <SelectItem value="rent">For Rent</SelectItem>
              <SelectItem value="inactive">Sold/Rented</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 3. LOCATION */}
      <div>
        <label className="text-sm font-medium">Property Address</label>
        <Input
          name="location"
          defaultValue={property?.location || ""}
          placeholder="Enter the address of the property..."
          className="mt-1 border-gray-300 placeholder:text-gray-500"
          required
        />
      </div>

      {/* 4. NEW: CONTACT INFO SECTION */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 space-y-4">
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Contact Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Contact Phone Number</label>
            <Input
              type="tel"
              name="contact_phone"
              defaultValue={property?.contact_phone || ""}
              placeholder="e.g. +234 800 000 0000"
              className="mt-1 border-gray-300 placeholder:text-gray-500"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Contact Email</label>
            <Input
              type="email"
              name="contact_email"
              defaultValue={property?.contact_email || ""}
              placeholder="agent@example.com"
              className="mt-1 border-gray-300 placeholder:text-gray-500"
              required
            />
          </div>
        </div>
      </div>

      {/* 5. DESCRIPTION */}
      <div>
        <label className="text-sm font-medium">Description</label>
        <Textarea
          name="description"
          defaultValue={property?.description || ""}
          placeholder="Write a brief description..."
          className="mt-1 border-gray-300 placeholder:text-gray-500 min-h-[120px]"
          required
        />
      </div>

      {/* 6. IMAGES */}
      <div>
        <label className="text-sm font-medium">Property Images</label>
        <div className="grid mt-2">
          <Input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={(e) => setImages(e.target.files)}
            className="border-dashed text-gray-500 border-gray-500 pt-10 pb-14 h-[140px]"
            // Images cannot be pre-filled securely in file inputs, 
            // so we don't use defaultValue here.
            required={mode === "create"} // Only required when creating new
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {mode === "edit" ? "Upload new images to replace existing ones (optional)." : "You can upload multiple images."}
        </p>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="flex justify-end pt-4">
        <Button 
          disabled={loading} 
          className={`bg-purple-600 text-white px-6 py-2 hover:bg-purple-700 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? "Saving..." : mode === "edit" ? "Update Property" : "Register Property"}
        </Button>
      </div>

    </form>
  )
}

export default PropertyForm