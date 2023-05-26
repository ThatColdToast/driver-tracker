// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Create a single supabase client for interacting with your database
  const supabase = createClient('https://fklutoctmzfawwrahwbd.supabase.co', process.env.SUPABASE_KEY ?? 'err')
  
  

  res.status(200).json({ name: 'John Doe' })
}
