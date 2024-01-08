import dayjs from "dayjs";
import React from "react";
import { useContext } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from '../styles/Icons'
import ButtonGroup from "./ButtonGroup";
import  GlobalContext  from "../context/GlobalContext";

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const { daySelected, setDaySelected } = useContext(GlobalContext);
  const { calendarTypeSelected } = useContext(GlobalContext);


  function handlePrev() {
    if( calendarTypeSelected === "Month"){
      setMonthIndex(monthIndex - 1);
      setDaySelected(daySelected.subtract(1, "month"));
    } else if( calendarTypeSelected === "Week"){
      setDaySelected(daySelected.subtract(1, "week"));
    } else if ( calendarTypeSelected === "Day"){
      setDaySelected(daySelected.subtract(1, "day"));
    } else if ( calendarTypeSelected === "Year"){
      setMonthIndex(monthIndex - 12);
      setDaySelected(daySelected.subtract(1, "year"));
    }
  }
  function handleNext() {
    if( calendarTypeSelected === "Month"){
      setMonthIndex(monthIndex + 1);
      setDaySelected(daySelected.add(1, "month"));
    } else if( calendarTypeSelected === "Week"){
      setDaySelected(daySelected.add(1, "week"));
    } else if ( calendarTypeSelected === "Day"){
      setDaySelected(daySelected.add(1, "day"));
    } else if ( calendarTypeSelected === "Year"){
      setMonthIndex(monthIndex + 12);
      setDaySelected(daySelected.add(1, "year"));
    }
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
    setDaySelected(dayjs());
  }
  return (
    <header className="justify-between inline-flex max-w-[calc(100vw-360px)] p-2 w-[calc(100vw-360px)]">
      <div className="inline-flex">
        <button onClick={handlePrev}>
          <ChevronLeftIcon className="w-5 h-5 pt-2" />
        </button>
        <button
          onClick={handleReset}
          className="border-1 p-1"
        >
          Today
        </button>
        <button onClick={handleNext}>
          <ChevronRightIcon className="w-5 h-5 pt-2" />
        </button>
      </div>


      <ButtonGroup />


      <h2 className="text-nowrap ml-4 text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format(
          "MMMM YYYY"
        )}
      </h2>
    </header>
  );
}
