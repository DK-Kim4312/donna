'use client'
import React, { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'

export default function ProfileTab({ uid, url }) {
  const supabase = createClientComponentClient()
  const [avatarUrl, setAvatarUrl] = useState(null)

  useEffect(() => {
    async function downloadImage(path) {
      try {
        const { data, error } = await supabase.storage.from('avatars').download(path)
        if (error) {
          throw error
        }

        const url = URL.createObjectURL(data)
        setAvatarUrl(url)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    if (url) downloadImage(url)
  }, [url, supabase])


  return (
    <div>
      {avatarUrl ? (
        <Image
          width={10}
          height={10}
          src={avatarUrl}
          alt="Avatar"
          className="avatar image"
          style={{ height: 10, width: 10 }}
        />
      ) : (
        <div className="avatar no-image" style={{ height: 10, width: 10 }} />
      )}
    </div>
  )
}