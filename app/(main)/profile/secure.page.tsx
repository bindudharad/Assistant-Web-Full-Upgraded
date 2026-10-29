import React from 'react';
import { cookies } from 'next/headers';
import { getUserByAccessToken } from '../../../../lib/supabase-server';

export default async function SecureProfilePage() {
  const cookieStore = cookies();
  const token = cookieStore.get('sb-access-token')?.value ?? null;
  const user = await getUserByAccessToken(token);
  if (!user) {
    return (
      <div style={{padding:24}}>
        <h2>Not authenticated</h2>
        <p>Please <a href='/(auth)/login'>sign in</a> to view this page.</p>
      </div>
    );
  }
  return (
    <div style={{padding:24}}>
      <h2>Secure Profile</h2>
      <p>Welcome, {user.email ?? user.id}</p>
    </div>
  );
}
