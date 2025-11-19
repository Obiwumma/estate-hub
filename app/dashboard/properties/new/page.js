"use client";

import { useState } from "react";

import { Card } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function NewProperty() {
  return (
    <div>
      <h1>Add New Property Form</h1>

      <h2>Property Details</h2>

      <form>
        
         {/* TITLE */}
        <div className="space-y-2">
          <label className="font-medium">Title</label>
          <Input name="title" placeholder="3 Bedroom Flat" required />
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-2">
          <label className="font-medium">Description</label>
          <Textarea
            name="description"
            placeholder="Describe the property..."
            required
          />
        </div>

        {/* PRICE */}
        <div className="space-y-2">
          <label className="font-medium">Price (₦)</label>
          <Input name="price" type="number" placeholder="35000000" required />
        </div>

        {/* LOCATION */}
        <div className="space-y-2">
          <label className="font-medium">Location</label>
          <Input name="location" placeholder="Abuja, Nigeria" required />
        </div>

        {/* STATUS */}
        <div className="space-y-2">
          <label className="font-medium">Status</label>
          <Select name="status">
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-white" >
              <SelectItem value="For Sale">For Sale</SelectItem>
              <SelectItem value="Rented">Rented</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* IMAGE UPLOAD */}
        <div className="space-y-2">
          <label className="font-medium">Property Images</label>
          <Input
            type="file"
            name="images"
            accept="image/*"
            multiple
            required
            onChange={(e) => setImages(e.target.files)}
          />
          <p className="text-sm text-muted-foreground">
            You can upload multiple images.
          </p>
        </div>

        {/* SUBMIT */}
        <Button type="submit" className="w-full">
          Add Property
        </Button>

      </form>
    </div>
  )
}

export default NewProperty
