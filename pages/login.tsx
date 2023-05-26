import Image from 'next/image'
import { Inter } from 'next/font/google'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  // Create a single supabase client for interacting with your database
  const supabase = createClient('https://fklutoctmzfawwrahwbd.supabase.co', process.env.SUPABASE_KEY ?? 'err')
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Auth supabaseClient={supabase} theme="dark" />
      <button
              className="btn-black w-full mt-12"
              onClick={async () => {
                const { error } = await supabase.auth.signOut()
                if (error) console.log('Error logging out:', error.message)
              }}
            >
            Logout
      </button>
    </main>
  )
}
