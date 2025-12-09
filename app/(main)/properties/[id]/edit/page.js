import { useParams } from 'next/navigation'
import React from 'react'
import { supabase } from '@/lib/supabase/client'

function EditForm() {
  const {propertyId} = useParams

  

  return (
    <div>
      
    </div>
  )
}

export default EditForm
