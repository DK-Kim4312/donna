import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'

export async function GET(req) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')


  if (code) {
    // Exchange the code for auth token and then the auth token for a session cookie
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL('/profile', req.url));

  // URL to redirect to after sign in process completes
  //return NextResponse.redirect(new URL('/profile', req.url));
}
