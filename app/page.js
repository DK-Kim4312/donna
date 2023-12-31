"use client";
import React, { useState, useContext, useEffect } from "react";
import Sidebar from '../components/Sidebar';
import CalendarHeader from "../components/CalendarHeader";
import { getMonth } from "../lib/util";
import Month from "../components/Month";
import GlobalContext from "../context/GlobalContext";
import EventModal from "../components/EventModal";
import ContextWrapper from "../context/ContextWrapper";

export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);
  //const [currentWeek, setCurrentWeek] = useState(getWeek());

  useEffect(() => {
    if (monthIndex === null) setCurrentMonth(getMonth());
    else setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  // useEffect(() => {
  //   if (weekIndex === null) setCurrentWeek(getWeek());
  //   else setCurrentMonth(getWeek(weekIndex));
  // }, [weekIndex]);

  useEffect(() => {
    if (showEventModal) {
      console.log("showEventModal");
    } else {
      console.log("hideEventModal");
    }
  }, [showEventModal]);

  return (
    <ContextWrapper>
      <React.Fragment>
        <div className="min-h-screen max-h-screen max-w-screen min-w-screen flex">
          {showEventModal && <EventModal />}
            <Sidebar />

          <div className="shrink-1 flex flex-col h-[100vh]">
            <div className="flex w-1/1">
              <CalendarHeader />
            </div>
            <div className="flex w-1/1 h-[100vh]">
              <Month month={currentMonth} />
            </div>
          </div>
        </div>
      </React.Fragment>
    </ContextWrapper>
  );
}
