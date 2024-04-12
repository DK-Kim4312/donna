'use client'
import Avatar from './avatar'
import { useCallback, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import '../globals.css'
import './profile.module.css'

export default function ProfileForm({ session }) {
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(true)
  const [firstname, setFirstname] = useState(null)
  const [lastname, setLastname] = useState(null)
  const [username, setUsername] = useState(null)
  const [organization, setOrganization] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const user = session?.user

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('users')
        .select(`firstname, lastname, username, organization, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFirstname(data.firstname)
        setLastname(data.lastname)
        setUsername(data.username)
        setOrganization(data.organization)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({ firstname, lastname, username, organization, avatar_url }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('users').upsert({
        id: user?.id,
        firstname,
        lastname,
        username,
        organization,
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
    <div className="min-h-screen min-w-screen h-[100%] w-[100%] flex items-center justify-center">
      <div className="min-w-[50%] min-h-[90%] h-[90%] bg-white p-4 shadow-md rounded-md">
        <div className='flex justify-between'>
          <label htmlFor="profile_picture">Profile Picture</label>
          <Avatar
            uid={user.id}
            url={avatar_url}
            size={150}
            placeholder={firstname ? firstname.charAt(0) : '?'}
            onUpload={(url) => {
              setAvatarUrl(url)
              updateProfile({ firstname, lastname, username, organization, avatar_url: url })
            }}
          />
        </div>

        <div className='flex justify-between'>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" className='w-[70%] border-2 border-gray-300 rounded-md' value={session?.user.email} disabled />
        </div>
        <div className='flex justify-between'>
          <label htmlFor="firstname">First name</label>
          <input
            id="firstname"
            type="text"
            className='w-[70%] border-2 border-gray-300 rounded-md'
            value={firstname || ''}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className='flex justify-between'>
          <label htmlFor="lastname">Last name</label>
          <input
            id="lastname"
            type="text"
            className='w-[70%] border-2 border-gray-300 rounded-md'
            value={lastname || ''}
            onChange={(e) => setLastname(e.target.value)}
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
          <label htmlFor="organization">Organization</label>
          <input
            id="organization"
            type="url"
            className='w-[70%] border-2 border-gray-300 rounded-md'
            value={organization || ''}
            onChange={(e) => setOrganization(e.target.value)}
          />
        </div>
        <div className='flex'>

          <div className="mt-4">
            <button
              onClick={() => updateProfile({ firstname, lastname, username, organization, avatar_url })}
              disabled={loading}
            >
              {loading ? 'Loading ...' : 'Update'}
            </button>
          </div>

          <div className="ml-4 mt-4">
            <button
              onClick={() => window.location.href = '/'}
              disabled={loading}
            >
              Back to home
            </button>
          </div>
          <div className="ml-4 mt-4">
              <Link href='/update-password'>
                Update Password
              </Link>
          </div>

          <div className="ml-4 mt-4">
            <form action="/auth/logout" method="post">
              <button type="submit">
                Log out
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
