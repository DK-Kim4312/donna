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

  if (!user) {
    console.log("User Not Logged In!")
    return redirect('/login');
  }

  // make all components be in the center of the page
  return (
    <div className="bg-[#fff] h-[100%] w-[100%] flex flex-col">
      <h1 className="mt-[30vh] m-auto text-3xl flex font-bold">Welcome to Donna!</h1>
      <div className=" m-auto w-[8em]">
        <Link className="flex" href="/account">
          Go to Account
        </Link>
        <Link className="flex" href="/main">
          Go to Calendar
        </Link>
        <Logout />
      </div>
    </div>
  );
}
