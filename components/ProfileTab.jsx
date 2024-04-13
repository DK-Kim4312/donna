'use client'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarContext } from '../context/CalendarContext'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function ProfileTab() {
    const { user, setUser } = useContext(CalendarContext)
    const [loading, setLoading] = useState(true)
    const [avatarUrl, setAvatarUrl] = useState(null)

    useEffect(() => {
        async function downloadImage(path) {
            const response = await fetch(`/api/user/get/avatar/${path}`)
            const data = await response.blob()

            const url = URL.createObjectURL(data)
            setAvatarUrl(url)
        }
        if (user.avatar_url) {
            downloadImage(user.avatar_url)
        } 
        setLoading(false)
    }, [user])

    function toProfile() {
        if (user) {
            window.location.href = `/profile`
        } else {
            window.location.href = `/login`
        }
    }

    function toPremium() {
        if (user) {
            window.location.href = `/upgrade-to-premium`
        } else {
            window.location.href = `/login`
        }
    }

    if (loading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <Skeleton variant="circular" width={40} height={40} />
                <Box sx={{ width: '80%' }}>
                    <Skeleton width='80%'/>
                    <Skeleton width="60%" />
                </Box>
            </Box>
        )
    }
    return (

        <div className="relative inline-flex shrink-0 rounded-md bg-[#fff] h-12 w-[80%] min-w-[80%]">
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