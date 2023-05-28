import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { Database } from '@/types/supabase'
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
    <main title='Login' className='w-screen h-screen p-8 items-center bg-gray-400'>
      <div className='w-3/4 p-4 flex flex-col items-center bg-gray-200 border-blue-900 text-black border-2 rounded-xl'>
        Email:
        <input
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className='m-4 p-2 w-1/2 text-black rounded-md'
        />

        Password:
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className='m-4 p-2 w-1/2 text-black rounded-md'
        />
        <div className=''>
          <button onClick={handleSignIn}  className='m-4 p-2 w-40 bg-red-700 text-white rounded-md'>Sign in</button>
          <button onClick={handleSignOut} className='m-4 p-2 w-40 bg-gray-300 text-black rounded-md'>Sign out</button>
        </div>
        <Link href='/reset' className='opacity-50 hover:opacity-100'>Forgot your password?</Link>
        <Link href='/signup' className='opacity-50 hover:opacity-100'>Sign Up</Link>
      </div>
    </main>
  )
}