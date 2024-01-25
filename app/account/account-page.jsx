'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import '../globals.css'
import ProfileTab from '../../components/ProfileTab'
import OverviewPage from './subpages/OverviewPage'

export default function AccountPage({ session }) {
    const supabase = createClientComponentClient()
    const [loading, setLoading] = useState(true)
    const [firstname, setFirstname] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)
    const user = session?.user

    const [activeTab, setActiveTab] = useState(0)

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

    // main



    const Overview = () => {

        return (
            <OverviewPage />
        )

    }

    const Security = () => {
        return (
            <div className='bg-[#ccc] h-full w-[20vw]'>
                Security
            </div>
        )


    }

    const Preferences = () => {

        return (
            <div className='bg-[#ccc] h-full w-[20vw]'>
                Preferences
            </div>
        )


    }

    const Password = () => {

        return (
            <div className='bg-[#ccc] h-full w-[20vw]'>
                Password
            </div>
        )


    }

    const Settings = () => {

        return (
            <div className='bg-[#ccc] h-full w-[20vw]'>
                Settings
            </div>
        )

    }

    const tabs = [Overview, Security, Preferences, Password, Settings]

    return (
        <div className="flex max-h-[100vh] max-w-[100vw] overflow-hidden">
            <aside className="relative flex flex-col w-[283px] shrink-0 pl-[25px] pt-[36px]">
                <div className="relative h-[90px] w-[283px] shrink-0">
                    <ProfileTab
                        uid={user?.id}
                        firstname={firstname}
                        url={avatar_url}
                        placeholder={firstname ? firstname.charAt(0) : '?'} />
                </div>

                <div className="flex flex-col w-[283px] h-[100%]">
                    <button onClick={() => setActiveTab(0)} className={`flex items-center w-[283px] h-[48px] text-[#333] text-lg mt-5 ${activeTab === 0 ? 'bg-[#f7f7f7]' : ''} hover:bg-[#f7f7f7]`}>
                        <span className="ml-[20px]">Overview</span>
                    </button>
                    <button onClick={() => setActiveTab(1)} className={`flex items-center w-[283px] h-[48px] text-[#333] text-lg mt-5 ${activeTab === 1 ? 'bg-[#f7f7f7]' : ''} hover:bg-[#f7f7f7]`}>
                        <span className="ml-[20px]">Security</span>
                    </button>
                    <button onClick={() => setActiveTab(2)} className={`flex items-center w-[283px] h-[48px] text-[#333] text-lg mt-5 ${activeTab === 2 ? 'bg-[#f7f7f7]' : ''} hover:bg-[#f7f7f7]`}>
                        <span className="ml-[20px]">Preferences</span>
                    </button>
                    <button onClick={() => setActiveTab(3)} className={`flex items-center w-[283px] h-[48px] text-[#333] text-lg mt-5 ${activeTab === 3 ? 'bg-[#f7f7f7]' : ''} hover:bg-[#f7f7f7]`}>
                        <span className="ml-[20px]">Password</span>
                    </button>
                    <button onClick={() => setActiveTab(4)} className={`flex items-center w-[283px] h-[48px] text-[#333] text-lg mt-5 ${activeTab === 4 ? 'bg-[#f7f7f7]' : ''} hover:bg-[#f7f7f7]`}>
                        <span className="ml-[20px]">Settings</span>
                    </button>
                </div>
            </aside>
            <main>
                {tabs[activeTab]()}
            </main>



        </div>
    )
}
