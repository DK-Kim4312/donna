'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import '../globals.css'
import ProfileTab from './profile-tab'

export default function AccountPage({ session }) {
    const supabase = createClientComponentClient()
    const [loading, setLoading] = useState(true)
    const [firstname, setFirstname] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)
    const user = session?.user


    const getProfile = useCallback(async () => {
        try {
            setLoading(true)

            const { data, error, status } = await supabase
                .from('profiles')
                .select(`firstname, avatar_url`)
                .eq('id', user?.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setFirstname(data.firstname)
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

    return (
        <div className="flex flex-row min-w-[100vw] min-h-[100vh] w-[100vw] h-[100vh] max-w-[100vw] max-h-[100vh] overflow-hidden">
            <aside className="relative flex flex-col w-[283px] shrink-0 pl-[25px] pt-[36px]">
                <div className="relative h-[90px] w-[283px] shrink-0">
                    <ProfileTab
                        uid={user?.id}
                        firstname={firstname}
                        url={avatar_url}
                        placeholder={firstname ? firstname.charAt(0) : '?'} />
                </div>

            </aside>
        </div>
    )
}
