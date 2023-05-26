import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { Database } from '../types/supabase'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    router.refresh()
  }

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    })
    router.refresh()
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <main title='Login' className='w-screen h-screen p-8 items-center bg-gradient-to-b from-blue-800 to-slate-800'>
      <div className='w-3/4 p-4 flex flex-col items-center bg-slate-800 border-white border-2 rounded-xl drop-shadow-md'>
        Email:
        <input
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className='m-4 p-2 w-1/2 rounded-md'
        />

        Password:
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className='m-4 p-2 w-1/2 rounded-md'
        />
        <div className=''>
          <button onClick={handleSignIn}  className='bg-red-400 m-4 p-2 w-40 rounded-md'>Sign in</button>
          <button onClick={handleSignUp}  className='bg-red-400 m-4 p-2 w-40 rounded-md'>Sign up</button>
          <button onClick={handleSignOut} className='bg-red-400 m-4 p-2 w-40 rounded-md'>Sign out</button>
        </div>
        <Link href='' className='opacity-50 hover:opacity-100'>Forgot your password?</Link>
        {/* <Link href='' className='opacity-50 hover:opacity-100'>Sign Up</Link> */}
      </div>
    </main>
  )
}