import Image from 'next/image'
import { Inter } from 'next/font/google'
import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

import type { Database } from '@/types/supabase'
import ShiftItem from '@/components/Shift'
import Head from 'next/head'
import Navbar from '@/components/navbar'
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

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("shifts").select();
      setShifts(data);
    };

    getData();
  }, []);

  return (
    <main className={`w-screen h-screen bg-slate-500 ${inter.className}`}>
      <Head><title>Shifts</title></Head>
      <Navbar/>
      <div className='p-24 flex flex-col justify-center items-center'>
        { shifts ?
        <>
          Shifts:
          <div className='flex flex-col bg-zinc-400 border-blue-900 text-black rounded-lg'>
            {shifts.map(shift => (<ShiftItem key={shift.id} {...shift}/>))}
            {/* {shifts.reduce((partialSum, a) => (partialSum + a.revenue), 0)} */}
          </div>
        </> : <>
          Shifts:
          <p>
            Loading...
          </p>
        </>
        }
      </div>
    </main>
  )
}
