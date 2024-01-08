'use client';
import React from "react";
import { useState, useEffect, useCallback } from "react";
import ChatView from "../../components/ChatView";
import MiniCalendar from "../../components/MiniCalendar";
import ProfileTab from "./profile-tab";
import CreateEventButton from "../../components/CreateEventButton";
import GenerateScheduleButton from "../../components/GenerateScheduleButton";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
export default async function Sidebar({ session }) {
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
    <aside className="bg-teal-600 bg-opacity-50 relative flex flex-col w-[360px] shrink-0">
      <ProfileTab
        uid={user.id}
        url={avatar_url}
        placeholder={firstname ? firstname.charAt(0) : '?'} />
      <MiniCalendar />
      <div className="flex flex-row items-center justify-center">
        <CreateEventButton />
        <GenerateScheduleButton />
      </div>
      <ChatView />
    </aside>
  );
}
