import { supabase } from "./supabase/client"

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


  // UPLOAD IMAGES TO STORAGE BUCKET
  const uploadedImages = [];

  for (let i = 0; i < images.length; i++) {
    const url = await uploadFile(images[i]);
    if (url) uploadedImages.push(url);
  }

  await supabase.from("properties").insert({
    title,
    price,
    location,
    description,
    status,
    images: uploadedImages
  })

  alert("Property registered successfully!");


}