'use client'
import Avatar from './avatar'
import { useCallback, useEffect, useState, useContext } from 'react'
import { CalendarContext } from '../../context/CalendarContext'
import { User } from '../../types/User'

import Link from 'next/link'
import '../globals.css'
import './profile.module.css'

export default function ProfileForm() {

  const { user, setUser } = useContext(CalendarContext)

  const [loading, setLoading] = useState(true)
  const [firstname, setFirstname] = useState(null)
  const [lastname, setLastname] = useState(null)
  const [username, setUsername] = useState(null)
  const [organization, setOrganization] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    function fetchProfile() {
      setFirstname(user.firstname)
      setLastname(user.lastname)
      setUsername(user.username)
      setOrganization(user.organization)
      setAvatarUrl(user.avatar_url)
      setLoading(false)
    }
    if (user) {
      fetchProfile()
    }
  }, [user])

  useEffect(() => {
    async function getUser() {
      const response = await fetch('/api/user/get')
      if (response.ok) {
        const data = await response.json()
        setUser(data)
      } else {
        alert('Error loading user data!')
      }
    }
    getUser()
  } , [])

  async function updateProfile() {
    const response = await fetch('/api/user/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user.id,
        firstname,
        lastname,
        username,
        organization,
        avatar_url,
      }),
    })
    if (response.ok) {
      // update successful
    } else {
      // update failed
      alert('Update failed')
    }
  }

  async function updateAvatar() {
    const response = await fetch('/api/user/update/avatar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user.id,
        avatar_url,
      }),
    })
    if (response.ok) {
      // update successful
    } else {
      // update failed
      alert('Update failed')
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
              updateAvatar()
            }}
          />
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
              onClick={() => updateProfile}
              disabled={loading}
            >
              {loading ? 'Loading ...' : 'Update'}
            </button>
          </div>

          <div className="ml-4 mt-4">
            <button
              onClick={() => window.location.href = '/main'}
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
