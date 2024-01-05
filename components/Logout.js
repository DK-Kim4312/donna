'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';

const Logout = () => {
  const supabase = createClientComponentClient('https://kyysqwafkfklqqawdolp.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5eXNxd2Fma2ZrbHFxYXdkb2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQzODM1ODIsImV4cCI6MjAxOTk1OTU4Mn0._s64NAhTTNRD4-s4pJWs7I-5pbtfuVHAHIecwjwKzGU');

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return (
        redirect('/')
      )
    }
  }

  return (
    <button type="button" className="button-inverse" onClick={handleLogout}>
      Log Out
    </button>
  );
}
export default Logout;