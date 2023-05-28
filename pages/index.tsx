import Image from 'next/image'
import { Inter } from 'next/font/google'
import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

import type { Database } from '@/types/supabase'
import ShiftItem from '@/components/Shift'
type Shift = Database["public"]["Tables"]["shifts"]["Row"];

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  // Fetch the user client-side
  // const { user } = useUser();

  // Server-render loading state
  // if (!user) {
  //   return <>Loading...</>;
  // }

  const [shifts, setShifts] = useState<Shift[] | null>(null);

  // Create a single supabase client for interacting with your database
  const supabase = createClientComponentClient<Database>()
  // const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL ?? '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'err')
  // const { data, error } = supabase.from('shifts').select() // Select all from user ordered by data desc

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("shifts").select();
      setShifts(data);
    };

    getData();
  }, []);

  return (
    <main
      title='Shifts'
      className={`w-screen h-screen bg-neutral-400 ${inter.className}`}
    >
      <div className='flex flex-col items-center justify-center p-24'>
        { shifts ?
        <>
          Shifts:
          <div className='flex flex-col bg-gray-200 border-blue-900 text-black rounded-lg'>
            {shifts && shifts.map(shift => (<ShiftItem {...shift}/>))}
          </div>
        </> : <>
          Loading Shifts...
        </>
        }
      </div>
    </main>
  )
}
