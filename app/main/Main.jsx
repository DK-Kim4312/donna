'use client';
import React, { useState, useEffect, useCallback } from "react";
import Sidebar from './Sidebar';
import CalendarHeader from "../../components/CalendarHeader";
import { getMonth } from "../../lib/util";
import Week from "../../components/Week";
import Month from "../../components/Month";
import EventModal from "../../components/EventModal";
import styles from "../../styles/Main.module.css";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import ChatView from "../../components/ChatView";
import MiniCalendar from "../../components/MiniCalendar";
import ProfileTab from "./profile-tab";
import CreateEventButton from "../../components/CreateEventButton";
import GenerateScheduleButton from "../../components/GenerateScheduleButton";


export default function Main({ session }) {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useState(null); // TODO:
  //const [currentWeek, setCurrentWeek] = useState(getWeek());

  useEffect(() => {
    if (monthIndex === null) setCurrentMonth(getMonth());
    else setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

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
      <div className={styles.full}>
        {showEventModal && <EventModal />}
        {/*Sidebar*/}
        <aside className="bg-teal-600 bg-opacity-50 relative flex flex-col w-[360px] shrink-0">
          <ProfileTab
            uid={user.id}
            firstname={firstname}
            url={avatar_url}
            placeholder={firstname ? firstname.charAt(0) : '?'} />
          <MiniCalendar />
          <div className="flex flex-row items-center justify-center">
            <CreateEventButton />
            <GenerateScheduleButton />
          </div>
          <ChatView />
        </aside>
        {/*Calendar*/}
        <div className={styles.calendar}>
          <div className={styles["calendar-header"]}>
            <CalendarHeader />
          </div>
          <div className={styles["calendar-body"]}>
            <Week />
            {/* <Month month={currentMonth} />*/}
          </div>
        </div>
      </div>
    </React.Fragment>

  );
}
