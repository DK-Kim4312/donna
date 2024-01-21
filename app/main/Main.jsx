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
  // ---------Sidebar -----------

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}
      <div className="flex flex-row min-w-[100vw] min-h-[100vh] w-[100vw] h-[100vh]">
        {/*Sidebar*/}
        <aside className="bg-[#52ab98] bg-opacity-50 relative flex flex-col w-[360px] shrink-0 pl-[25px] pt-[36px]">
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
          <div className="absolute bottom-[5px] w-[100%] ml-[5px] mr-[5px]">
            <ChatView />
          </div>
        </aside>
        <Calendar />
      </div>

    </React.Fragment>

  );
}
