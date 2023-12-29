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
  const [currentmonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <ContextWrapper>
      <React.Fragment>
        {showEventModal && <EventModal />}
        <div className="h-screen w-screen inline-flex w-[100vw] h-[100vh]">
          <div className="w-1/4 md:w-1/4 bg-[#52ab9833]">
            <Sidebar />
          </div>
          <div className="flex flex-col w-3/4 md:w-3/4 h-[100vh]">
            <div className="flex w-1/1">
              <CalendarHeader />
            </div>
            <div className="flex w-1/1 h-[100vh]">
              <Month month={currentmonth} />
            </div>
          </div>
        </div>
      </React.Fragment>
    </ContextWrapper>
  );
}
