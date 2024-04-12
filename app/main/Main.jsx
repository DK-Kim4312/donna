'use client';
import React, { useState, useEffect, useCallback, useContext } from "react";
import EventModal from "../../components/EventModal";
import styles from "../../styles/Main.module.css";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import ChatView from "../../components/ChatView";
import ProfileTab from "./profile-tab";
import CreateEventButton from "../../components/CreateEventButton";
import GenerateScheduleButton from "../../components/GenerateScheduleButton";
import Calendar from "../../components/Calendar";
import GlobalContext from "../../context/GlobalContext";

export default function Main({ session }) {
  const { showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    if (showEventModal) {
      console.log("showEventModal");
    } else {
      console.log("hideEventModal");
    }
  }, [showEventModal]);

  // ---------Sidebar -----------
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(true)
  const [firstname, setFirstname] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const user = session?.user

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error } = await supabase
        .from('users')
        .select(`firstname, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error) {
        throw error
      }

      if (data) {
        setFirstname(data.firstname)
        setAvatarUrl(data.avatar_url)
      }

    } catch (error) {
      console.log('error', error.message)
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    if (user) {
      getProfile()
    }

  }, [user, getProfile])

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <React.Fragment>
      {showEventModal && <EventModal />}
      <div className="flex flex-row min-w-[100vw] min-h-[100vh] w-[100vw] h-[100vh] max-w-[100vw] max-h-[100vh] overflow-hidden">
        {/*Sidebar*/}
        <aside className="relative flex flex-col w-[360px] shrink-0 pl-[25px] pt-[36px]">
          <div className="relative h-[90px] w-[360px] shrink-0">
            <ProfileTab
              uid={user?.id}
              firstname={firstname}
              url={avatar_url}
              placeholder={firstname ? firstname.charAt(0) : '?'} />
          </div>
          <div className="relative flex flex-row items-center justify-center">
            <CreateEventButton />
            <GenerateScheduleButton />
          </div>
          <div className="bottom-[5px] w-[100%] ml-[5px] mr-[5px] mt-[150px]">
            <ChatView />
          </div>
        </aside>
        <Calendar user={user} />

      </div>

    </React.Fragment>

  );
}
