import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import ProfileForm from './profile-form'
import SettingsForm from './settings-form'

export default async function Profile() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div>
      <ProfileForm session={session} />
      <SettingsForm session={session} />
    </div>

  );
}