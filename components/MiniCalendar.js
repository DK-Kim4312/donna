import React from 'react'
import { useEffect, useState } from "react";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";
import { getMonth } from "../lib/util";
import { ChevronLeftIcon, ChevronRightIcon } from "../styles/Icons";

export default function MiniCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(
    dayjs().month()
  );
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const {
    monthIndex,
    setMiniCalendarMonth,
    setDaySelected,
    daySelected,
  } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }
  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }
  function getDayClass(day) {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    if (nowDay === currDay) {
      return "bg-blue-500 rounded-full text-white";
    } else if (currDay === slcDay) {
      return "bg-blue-100 rounded-full text-blue-600 font-bold";
    } else {
      return "";
    }
  }
  return (
    <div className="ml-[5%] mt-[50px] w-[90%] relative shrink-0">
      <header className="flex justify-between pr-4 pl-4">
        <div>
          <button onClick={handlePrevMonth}>
            <ChevronLeftIcon className="w-4 h-4 mt-1.5" />
          </button>
        </div>
        <p className="text-[#52ab98] font-bold text-lg">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format(
            "MMMM 'YY"
          )}
        </p>
        <div>
          <button onClick={handleNextMonth}>
            <ChevronRightIcon className="w-4 h-4 mt-1.5" />
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day, i) => (
          <span key={i} className="text-sm pt-2 text-center">
            {day.format("ddd")}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setMiniCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                }}
                className={`py-1 w-full ${getDayClass(day)}`}
              >
                <span className="text-xs">{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="w-[100%] h-[0px] border border-[#52ab98] mb-[14px] mt-[8px]"></div>
    </div>
  );
}
