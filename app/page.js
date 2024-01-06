import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Logout from '../components/Logout';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user)

  if (!user) {
    console.log("error in page.js")
    return redirect('/error');
  }


  return (
    <div className="card">
      <h2>Welcome!</h2>
      <Link className="button" href="/profile">
        Go to Profile
      </Link>
      <Logout />
    </div>
  );
}
