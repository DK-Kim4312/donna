"use client"
import React, { useState, useEffect } from "react";
import Sidebar from './Sidebar';
import CalendarHeader from "./CalendarHeader";
import { getMonth } from "../lib/util";
import Week from "./Week";
import Month from "./Month";
import EventModal from "./EventModal";
import styles from "../styles/Main.module.css";

export default function Main() {
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

  return (
      <React.Fragment>
        <div className={styles.full}>
          {showEventModal && <EventModal />}
            <Sidebar />

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