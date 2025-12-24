"use client"

import { useState } from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input";
import { addProperty, updateProperty } from "@/lib/action"; 
import { Label } from "@/components/ui/label"; // Assuming you have a Label component, if not use standard <label>

function PropertyForm({ mode = "create", property }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // 1. Error State
  const [images, setImages] = useState(null);

  // Helper to Validate Data
  const validateForm = (formData) => {
    const newErrors = {};
    let isValid = true;

    // Title
    const title = formData.get("title");
    if (!title || title.length < 3) {
      newErrors.title = "Property name must be at least 3 characters.";
      isValid = false;
    }

    // Price
    const price = formData.get("price");
    if (!price || Number(price) <= 0) {
      newErrors.price = "Price must be a valid positive number.";
      isValid = false;
    }

    // Location
    if (!formData.get("location")) {
      newErrors.location = "Address is required.";
      isValid = false;
    }

    // Contact Phone (Basic check for length)
    const phone = formData.get("contact_phone");
    if (!phone || phone.length < 10) {
      newErrors.contact_phone = "Please enter a valid phone number.";
      isValid = false;
    }

    // Image Validation (Crucial!)
    // We check the state 'images' here because FormData file extraction can be tricky
    if (mode === "create" && (!images || images.length === 0)) {
       newErrors.images = "At least one image is required.";
       isValid = false;
    } 
    
    // Check File Sizes (Max 5MB per file)
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        if (images[i].size > 5 * 1024 * 1024) { // 5MB limit
           newErrors.images = `Image '${images[i].name}' is too large (Max 5MB).`;
           isValid = false;
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  async function handleSubmit(e) {
    e.preventDefault()
    setErrors({}); // Clear previous errors
    
    const formData = new FormData(e.target);

    // 2. Run Validation
    if (!validateForm(formData)) {
      return; // Stop if invalid
    }

    setLoading(true);

    try {
      // If editing, append ID
      if (mode === "edit" && property?.id) {
        formData.append("id", property.id);
        await updateProperty(formData);
      } else {
        await addProperty(formData);
      }
      // Note: Redirect usually happens in the Server Action
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
      
      {/* 1. PROPERTY NAME */}
      <div className="space-y-2">
        <Label className={errors.title ? "text-red-500" : ""}>Property Name</Label>
        <Input
          name="title"
          defaultValue={property?.title || ""}
          placeholder="e.g. Luxury 3 Bedroom Apartment"
          className={errors.title ? "border-red-500" : "border-gray-300"}
        />
        {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
      </div>

      {/* 2. PRICE & STATUS (Grid Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className={errors.price ? "text-red-500" : ""}>Price ($)</Label>
          <Input
            type="number"
            name="price"
            defaultValue={property?.price || ""}
            placeholder="e.g. 2000"
            className={errors.price ? "border-red-500" : "border-gray-300"}
          />
          {errors.price && <p className="text-xs text-red-500">{errors.price}</p>}
        </div>

        <div className="space-y-2">
          <Label>Property Status</Label>
          <Select name="status" defaultValue={property?.status || "sale"}>
            <SelectTrigger className="w-full border-gray-300">
              <SelectValue placeholder="Select status..." />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="sale">For Sale</SelectItem>
              <SelectItem value="rent">For Rent</SelectItem>
              <SelectItem value="inactive">Sold/Rented</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 3. LOCATION */}
      <div className="space-y-2">
        <Label className={errors.location ? "text-red-500" : ""}>Property Address</Label>
        <Input
          name="location"
          defaultValue={property?.location || ""}
          placeholder="e.g. 123 Orchid Road, Lekki"
          className={errors.location ? "border-red-500" : "border-gray-300"}
        />
        {errors.location && <p className="text-xs text-red-500">{errors.location}</p>}
      </div>

      {/* 4. CONTACT INFO SECTION (Styled Box) */}
      <div className="p-4 md:p-6 bg-gray-50 rounded-lg border border-gray-100 space-y-4">
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Contact Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className={errors.contact_phone ? "text-red-500" : ""}>Contact Phone</Label>
            <Input
              type="tel"
              name="contact_phone"
              defaultValue={property?.contact_phone || ""}
              placeholder="+234..."
              className={errors.contact_phone ? "border-red-500" : "border-gray-300"}
            />
            {errors.contact_phone && <p className="text-xs text-red-500">{errors.contact_phone}</p>}
          </div>
          
          <div className="space-y-2">
            <Label>Contact Email</Label>
            <Input
              type="email"
              name="contact_email"
              defaultValue={property?.contact_email || ""}
              placeholder="agent@example.com"
              className="border-gray-300"
              required // HTML5 validation is fine for Email format
            />
          </div>
        </div>
      </div>

      {/* 5. DESCRIPTION */}
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          name="description"
          defaultValue={property?.description || ""}
          placeholder="Describe the key features, neighborhood, etc..."
          className="border-gray-300 min-h-[120px]"
          required
        />
      </div>

      {/* 6. IMAGES (Drag & Drop styled) */}
      <div className="space-y-2">
        <Label className={errors.images ? "text-red-500" : ""}>Property Images</Label>
        
        <div className={`relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center transition-colors 
            ${errors.images ? "border-red-300 bg-red-50" : "border-gray-300 hover:bg-gray-50"}`}>
          
          <Input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={(e) => setImages(e.target.files)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="space-y-2 pointer-events-none">
             {/* Icon */}
             <div className="mx-auto w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
               <span className="text-xl">📷</span>
             </div>
             
             {/* Text feedback */}
             {images && images.length > 0 ? (
                <p className="text-sm font-medium text-purple-600">
                  {images.length} file(s) selected
                </p>
             ) : (
                <>
                  <p className="text-sm font-medium text-gray-700">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    SVG, PNG, JPG or GIF (max 5MB each)
                  </p>
                </>
             )}
          </div>
        </div>

        {/* Error Message for Images */}
        {errors.images && <p className="text-xs text-red-500 mt-1">{errors.images}</p>}

        <p className="text-xs text-gray-500">
          {mode === "edit" ? "Note: Uploading new images will replace existing ones." : ""}
        </p>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="flex justify-end pt-4 pb-10">
        <Button 
          type="submit"
          disabled={loading} 
          className="bg-purple-600 text-white px-8 py-2 hover:bg-purple-700 w-full md:w-auto"
        >
          {loading ? (
             <span className="flex items-center gap-2">Saving...</span>
          ) : (
             mode === "edit" ? "Update Property" : "Register Property"
          )}
        </Button>
      </div>

    </form>
  )
}

export default PropertyForm