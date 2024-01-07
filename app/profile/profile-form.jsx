'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import '../globals.css'

export default function ProfileForm({ session }) {
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState(null)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const user = session?.user

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[100%] max-w-md bg-white p-4 shadow-md rounded-md">
        <div className='flex justify-between'>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" className='w-[70%] border-2 border-gray-300 rounded-md' value={session?.user.email} disabled />
        </div>
        <div className='flex justify-between'>
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            className='w-[70%] border-2 border-gray-300 rounded-md'
            value={fullname || ''}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className='flex justify-between'>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            className='w-[70%] border-2 border-gray-300 rounded-md'
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='flex justify-between'>
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="url"
            className='w-[70%] border-2 border-gray-300 rounded-md'
            value={website || ''}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <button
            className="button primary block"
            onClick={() => updateProfile({ fullname, username, website, avatar_url })}
            disabled={loading}
          >
            {loading ? 'Loading ...' : 'Update'}
          </button>
        </div>

        <div className="mt-4">
          <form action="/auth/signout" method="post">
            <button className="button block" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
