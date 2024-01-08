import dayjs from "dayjs";
import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from '../styles/Icons'
import ButtonGroup from "./ButtonGroup";

export default function CalendarHeader() {
  const [monthIndex, setMonthIndex] = React.useState(
    dayjs().month()
  );

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
    <header className="justify-between inline-flex max-w-[calc(100vw-360px)] p-2 w-[calc(100vw-360px)]">
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


      <ButtonGroup />


      <h2 className="ml-4 text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format(
          "MMMM YYYY"
        )}
      </h2>
    </header>
  );
}
