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
    <main title='Login' className='w-screen h-screen bg-slate-700 p-8'>
      <div className='bg-slate-800 p-4 flex flex-col items-center border-gray-50 border-0 rounded-xl'>
        Email:
        <input
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className='m-4 p-2 w-96 rounded-md'
        />

        Password:
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className='m-4 p-2 w-96 rounded-md'
        />
        <div className=''>
          <button onClick={handleSignUp}  className='bg-red-400 m-4 p-2 w-40 rounded-md'>Sign up</button>
          <button onClick={handleSignIn}  className='bg-red-400 m-4 p-2 w-40 rounded-md'>Sign in</button>
          <button onClick={handleSignOut} className='bg-red-400 m-4 p-2 w-40 rounded-md'>Sign out</button>
        </div>
        <Link href='' className='opacity-50 hover:opacity-100'>Forgot your password?</Link>
        <Link href='' className='opacity-50 hover:opacity-100'>Sign Up</Link>
      </div>
    </main>
  )
}