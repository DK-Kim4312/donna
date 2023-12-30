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

  return (
    <ContextWrapper>
      <React.Fragment>
        <div className="h-screen w-screen inline-flex w-[100vw] h-[100vh]">
          {showEventModal && <EventModal />}
          <div className="w-1/4 md:w-1/4 bg-[#52ab98]/50">
            <Sidebar />
          </div>
          <div className="flex flex-col w-3/4 md:w-3/4 h-[100vh]">
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
