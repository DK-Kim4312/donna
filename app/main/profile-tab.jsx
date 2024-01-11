'use client'
import React, { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import Link from 'next/link'

export default function ProfileTab({ uid, url, firstname }) {
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

    function toProfile() {
        if (uid) {
            window.location.href = `/profile`
        } else {
            window.location.href = `/login`
        }
    }

    function toPremium() {
        if (uid) {
            window.location.href = `/upgrade-to-premium`
        } else {
            window.location.href = `/login`
        }
    }


    return (

        <div className="relative inline-flex shrink-0 rounded-md bg-[#fff] w-[60%] h-12 top-[25px] left-[36px]">
            {avatarUrl ? (<>
                <button className="fit items-start bg-[#ccc] rounded-lg w-10 h-10 mt-1 ml-1  overflow-hidden" onClick={toProfile}>
                    <div className="bg-[#transparent] text-white rounded-md">
                        <Image
                            width={50}
                            height={50}
                            src={avatarUrl}
                            alt="Avatar"
                            className="avatar image"
                            style={{ borderRadius: 5 }}
                        />
                    </div>
                </button>
                <div className="ml-2 mt-1">
                    <div className="text-sm font-semibold">{firstname}</div>
                    <button className="text-xs h-0.5 w-13 font-light" variant="ghost" onClick={toPremium}>
                        &gt; Upgrade to Premium
                    </button>
                </div>

            </>)
                : (<>
                    <button className="fit items-start bg-[#ccc] rounded-lg w-10 h-10 mt-1 ml-1">
                        <div className="bg-[#transparent] text-white rounded-md ">UN</div>
                    </button>
                    <div className="ml-2 mt-1">
                        <Link href="/login">
                            <div className="text-sm font-semibold">Login</div>
                        </Link>
                    </div>

                </>)}
        </div>
    )
}