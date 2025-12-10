import { supabase } from "./supabase/client"
import { createServerSupabaseClient } from "./supabase/server.server";

// GET CURRENT USER
const {
  data: { user },
} = await supabase.auth.getUser();

export async function uploadFile(file) {
  if (!file) return null

  const fileExt = file.name.split(".").pop()
  const fileName = `${Date.now()}-${Math.random()}.${fileExt}`

  const { data, error } = await supabase.storage
    .from("property-images")
    .upload(fileName, file, {
      upsert: false,
    })

  if (error) {
    console.error("Upload error:", error)
    return null
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from("property-images")
    .getPublicUrl(fileName)

  return urlData.publicUrl
}


export async function signUp(formData) {
  const full_name = formData.get("fullName");
  const email = formData.get("email");
  const password = formData.get("password");

  // Create auth user
   const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
      },
    },
  });

  if (error) return { error: error.message };
  return { data };
}


// Sign in user
export async function signIn(formData){

  const email = formData.get("email");
  const password = formData.get("password");

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { error: error.message };
  return { data };

}

// INSERT NEW ROW IN DATABASE

export async function addProperty(formData) {


  const title = formData.get("title");
  const price = formData.get("price");
  const location = formData.get("location");
  const description = formData.get("description");
  const status = formData.get("status");

  const files = formData.getAll("images");


  // UPLOAD IMAGES TO STORAGE BUCKET
  const uploadedImages = [];

  for (const file of files) {
    const url = await uploadFile(file);
    if (url) uploadedImages.push(url);
  }

  const {error} = await supabase.from("properties").insert({
    title,
    price,
    location,
    description,
    status,
    image_url: uploadedImages,
    owner_id: user.id,
  })
  if (error) {
    console.error(error);
    throw new Error("Failed to create property");
  } else{
  alert("Property registered successfully!");
  }

}

export async function getAllProperties() {
  const { data, error } = await supabase
    .from("properties")
    .select("*");

  if (error) {
    console.error("Fetch error:", error);
    return [];
  }

  return data;
}

export async function updateProperty(propertyId, updateData) {
  const { error } = await supabase
    .from("properties")
    .update(updateData)
    .eq("id", propertyId);

  if (error) throw error;

  return { success: true };
}


export async function deleteProperty(propertyId) {

  const { error } = await supabase
    .from("properties")
    .delete()
    .eq("id", propertyId);

  if (error) throw error;

  return { success: true };
}


export async function getPropertyById(propertyId) {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", propertyId)
    .single();

  // if (error) {
  //   console.error("Error fetching property:", error);
  //   return null;
  // }

  return data; 
}