"use client";
import React, { useState, useContext, useEffect } from "react";
import styles from '../styles/Layout.module.css';
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
        <div className="h-screen flex flex-hor">
          <div className={styles.sidebar}>
            <Sidebar />
          </div>
          <div className="flex flex-col w-[calc(100%-25vw)]">
            <CalendarHeader />
            <Month month={currentmonth} />
          </div>


        </div>
      </React.Fragment>
    </ContextWrapper>
  );
}
