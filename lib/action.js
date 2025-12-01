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
