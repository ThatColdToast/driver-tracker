import Image from 'next/image'
import { Inter } from 'next/font/google'
import { createClient } from '@supabase/supabase-js'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  // Fetch the user client-side
  // const { user } = useUser();

  // Server-render loading state
  // if (!user) {
  //   return <>Loading...</>;
  // }


  // Create a single supabase client for interacting with your database
  // const supabase = createClient('https://fklutoctmzfawwrahwbd.supabase.co', process.env.SUPABASE_KEY ?? 'err')
  // const { data, error } = supabase.from('shifts').select() // Select all from user ordered by data desc

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      title='Shifts'
    >
      Driver Tracker

      { /* Show Table of Entries */ }
    </main>
  )
}
