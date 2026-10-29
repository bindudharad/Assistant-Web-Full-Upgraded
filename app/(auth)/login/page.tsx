'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'

export default function LoginPage() {
  const supabase = createClientComponentClient()

  async function signInProvider(provider: 'google' | 'github') {
    await supabase.auth.signInWithOAuth({ provider })
  }

  return (
    <div style={{padding:24}}>
      <h2>Login</h2>
      <div style={{display:'flex',gap:8,marginTop:12}}>
        <button className="button" onClick={() => signInProvider('google')}>Sign in with Google</button>
        <button className="button" onClick={() => signInProvider('github')}>Sign in with GitHub</button>
      </div>
      <hr style={{margin:'18px 0'}} />
      <form method="post" action="/api/auth/login">
        <input name="email" placeholder="Email" /><br/><br/>
        <input name="password" placeholder="Password" type="password" /><br/><br/>
        <button type="submit" className="button">Sign in</button>
      </form>
    </div>
  )
}
