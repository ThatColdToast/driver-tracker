import Image from 'next/image'
import { Inter } from 'next/font/google'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

import type { Database } from '@/types/supabase'
import ShiftItem from '@/components/ShiftItem'
import Head from 'next/head'
import Navbar from '@/components/navbar'
import { useRouter } from 'next/navigation'
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

  const router = useRouter()

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
      <Navbar {...{tab:'home'}}/>
      <div className='p-2 flex flex-col justify-center items-center'>
          <div className='flex flex-col p-2 bg-zinc-400 text-black rounded-lg'>
            { shifts ?
            <>
              <p className='text-center text-white'>Shifts:</p>
              {shifts.map(shift => (<ShiftItem key={shift.id} {...shift}/>))}
              <button onClick={() => (router.push('/add'))} className='flex flex-row m-2 p-2 rounded-xl justify-center bg-red-700 hover:bg-red-600 text-white text-2xl font-bold'>+</button>
            </> : <>
              <p className='text-center text-white'>Shifts:<br/>Loading...</p>
            </>
            }
        </div>
      </div>
    </main>
  )
}
