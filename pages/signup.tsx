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

  return (
    <main title='Login' className='w-screen h-screen p-8 justify-center items-center bg-slate-500'>
      <div className='p-4 flex flex-col justify-center items-center bg-zinc-400 text-black rounded-xl'>
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
          <button onClick={handleSignUp}  className='m-4 p-2 w-40 bg-red-700 text-white rounded-md'>Create Account</button>
        </div>
        <Link href='/reset' className='opacity-50 hover:opacity-100'>Forgot your password? - Reset Password</Link>
        <Link href='/login' className='opacity-50 hover:opacity-100'>Already have an account? - Login</Link>
      </div>
    </main>
  )
}