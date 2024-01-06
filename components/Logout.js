'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';

const Logout = () => {
  const supabase = createClientComponentClient();

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