'use client'
import { useCallback, useEffect, useState, useContext } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import '../globals.css'
import ProfileTab from '../../components/ProfileTab'
import { PreferencesIcon, SecurityIcon, PasswordIcon, SettingsIcon } from '../../styles/Icons'
import Avatar from '../profile/avatar'
import Link from 'next/link'


export default function AccountPage({ session }) {
    const supabase = createClientComponentClient()
    const [loading, setLoading] = useState(true)
    const [firstname, setFirstname] = useState(null)
    const [lastname, setLastname] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)
    const user = session?.user

    var [activeTab, setActiveTab] = useState(0)

    const getProfile = useCallback(async () => {
        try {
            setLoading(true)

            const { data, error, status } = await supabase
                .from('profiles')
                .select(`firstname, lastname, avatar_url`)
                .eq('id', user?.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setLastname(data.lastname)
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

    const tabs = ["", Security, Preferences, Password, Settings]

    return (

        <div className="flex max-h-[100vh] min-h-[100vh] max-w-[100vw] min-w-[100vw] overflow-hidden">
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

            {activeTab === 0 ? <div className='flex ml-10 mt-10 mb-10 mr-10'>
                <div className="w-[25vw] h-[90vh] mr-10 relative bg-white shadow border b-1 flex flex-col items-center">
                    <div className="mt-10">
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
                    <div className="mt-5">
                        <div className="text-lg">{firstname} {lastname}</div>
                        <Link className='text-[#52ab98]' href="/upgrade-to-premium">Upgrade To Premium </Link>
                    </div>
                    <div className="mt-5">
                        <div className="text-sm">{user.email}</div>
                        <Link className=" text-[#52ab98] text-sm" href="/profile">Update Account Details</Link>
                    </div>
                    <div className="mt-[35vh]">
                        <form action="/auth/logout" method="post">
                            <button type="submit">
                                Log out
                            </button>
                        </form>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="h-[calc(45vh-20px)] w-[43vw] grid grid-cols-2 gap-10">
                        <div className="w-[20vw] h-[100%] relative bg-white shadow border b-1 flex flex-col items-center justify-center">
                            <div className="self-stretch flex-col justify-start items-center gap-[18px] inline-flex">
                                <div className="text-black text-3xl font-medium font-['Poppins']">Preferences</div>
                                <PreferencesIcon />
                                <div className="w-[179px] text-center text-black text-xs font-medium font-['Poppins']">Fine tune your Personal Assistant to work exactly the way you want!</div>
                                <button className="justify-start items-center gap-2.5 inline-flex" onClick={() => setActiveTab(1)}>
                                    Update Preferences
                                </button>
                            </div>
                        </div>

                        <div className="w-[20vw] h-[100%] relative bg-white shadow border b-1 flex flex-col items-center justify-center">
                            <div className="self-stretch flex-col justify-start items-center gap-[18px] inline-flex">
                                <div className="text-black text-3xl font-medium font-['Poppins']">Security</div>
                                <SecurityIcon />
                                <div className="w-[179px] text-center text-black text-xs font-medium font-['Poppins']">Keep your Verification Methods and Security Methods updated!</div>
                                <button className="justify-start items-center gap-2.5 inline-flex" onClick={() => setActiveTab(2)}>
                                    Update Security Info
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="h-[calc(45vh-20px)] w-[43vw] mt-10 grid grid-cols-2 gap-10">
                        <div className="w-[20vw] h-[100%] relative bg-white shadow border b-1 flex flex-col items-center justify-center">
                            <div className="self-stretch flex-col justify-start items-center gap-[18px] inline-flex">
                                <div className="text-black text-3xl font-medium font-['Poppins']">Password</div>
                                <PasswordIcon />
                                <div className="w-[179px] text-center text-black text-xs font-medium font-['Poppins']">Make your password stronger, or change it if you want to!</div>
                                <button className="justify-start items-center gap-2.5 inline-flex" onClick={() => setActiveTab(3)}>
                                    Update Password
                                </button>
                            </div>
                        </div>

                        <div className="w-[20vw] h-[100%] relative bg-white shadow border b-1 flex flex-col items-center justify-center">
                            <div className="self-stretch flex-col justify-start items-center gap-[18px] inline-flex">
                                <div className="text-black text-3xl font-medium font-['Poppins']">Settings</div>
                                <SettingsIcon />
                                <div className="w-[179px] text-center text-black text-xs font-medium font-['Poppins']">Change your settings to personalise the feel of your app and see how we manage your data!</div>
                                <button className="justify-start items-center gap-2.5 inline-flex" onClick={() => setActiveTab(4)}>
                                    Update Settings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : tabs[activeTab]()
            }

        </div>
    )
}
