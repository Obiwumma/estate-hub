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

  // 1️⃣ Create auth user
  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
      },
    },
  });

  if (signupError) {
    return { error: signupError.message };
  }

  const userId = signupData.user?.id;

  if (!userId) {
    return { error: "Signup failed. Please try again." };
  }

  // 2️⃣ Insert into profiles table
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .insert({
      id: userId,
      full_name,
      email,
    });

  if (profileError) {
    return { error: profileError.message };
  }

  return { data: profileData };
}
