import dayjs from "dayjs";
import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import { ChevronLeftIcon, ChevronRightIcon } from '../styles/Icons'

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  return (
    <header className="justify-between inline-flex p-2 w-[100vw]">
      <div>
        <button onClick={handlePrevMonth}>
          <ChevronLeftIcon className="w-5 h-5 pt-2" />
        </button>
        <button
          onClick={handleReset}
          className="border-1 p-1"
        >
          Today
        </button>
        <button onClick={handleNextMonth}>
          <ChevronRightIcon className="w-5 h-5 pt-2" />
        </button>
      </div>

      <div>
        <div style={{ width: 69, height: 29, borderRadius: 5, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
          <div style={{ color: 'black', fontSize: 14, fontWeight: '400', wordWrap: 'break-word' }}>Day</div>
        </div>
        <div style={{ width: 71, height: 29, borderRadius: 5, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
          <div style={{ color: 'black', fontSize: 14, fontWeight: '400', wordWrap: 'break-word' }}>Week</div>
        </div>
        <div style={{ width: 69, height: 29, background: '#52AB98', borderRadius: 5, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
          <div style={{ color: 'white', fontSize: 14, fontWeight: '400', wordWrap: 'break-word' }}>Month</div>
        </div>
        <div style={{ width: 69, height: 29, borderRadius: 5, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
          <div style={{ color: 'black', fontSize: 14, fontWeight: '400', wordWrap: 'break-word' }}>Year</div>
        </div>
      </div>

      <h2 className="ml-4 text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format(
          "MMMM YYYY"
        )}
      </h2>
    </header>
  );
}
