import React, { useState } from 'react';
import dayjs from 'dayjs';
import { ChevronLeftIcon, ChevronRightIcon } from '../styles/Icons';

export default function Week() {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const eventsOfWeek = [, , , , , ,];
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const renderCalendar = () => {
    const calendarDays = [];
    const startDate = new Date(currentWeek);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      calendarDays.push(day);
    }

    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(i);
    }

    return (
      <div>
        <div className="flex ml-[5vw]">
          {calendarDays.map((day, index) => (
            <div key={"Weekview" + day} className="flex flex-col">
              <div key={"Weekday" + index} className="bg-[#fff] text-center font-bold border border-y-0 h-6 w-[9vw]">{daysOfWeek[index]}</div>
              <div key={"Day" + index} className="bg-[#fff] text-center text-[#52AB98] font-bold border border-t-0 h-6 w-[9vw]">{dayjs(day).format("MMM DD")}</div>
            </div>
          ))}
        </div>
        <div className="flex">
          <div className="bg-[#fff] text-gray-400 text-center h-12 w-[5vw]">all day</div>
          {calendarDays.map((day, index) => (
            <div key={"Week-Event" + index} className="flex">
              <div className="bg-[#fff] text-center border border-t-0 h-12 w-[9vw]">{eventsOfWeek[index]}</div>
            </div>
          ))}
        </div>
        <div className="max-h-[600px] overflow-auto">
          {hours.map((hour) => (
            <div key={"Hours" + hour} className="flex ">
              <div className="bg-[#fff] text-gray-400 p-2 text-center w-[5vw]">
                {hour < 10 ? `0${hour}:00` : `${hour}:00`}
              </div>
              <div className="inline-flex  justify-between">
                {calendarDays.map((day, index) => (
                  <div key={"Events Box" + index} className="">
                    <div className="bg-[#fff] p-2 text-center border w-[9vw] h-12">{eventsOfWeek[index]}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const previousWeek = () => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() - 7);
    setCurrentWeek(newWeek);
  };

  const nextWeek = () => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() + 7);
    setCurrentWeek(newWeek);
  };

  return (
    <div className="bg-white p-4 w-[100%]">
      <div className="flex justify-center mb-4">
        <button
          onClick={previousWeek}
          className="px-4 py-2 rounded-md bg-[#52ab98] text-white hover:bg-blue-600"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
        <button
          onClick={nextWeek}
          className="px-4 py-2 rounded-md bg-[#52ab98] text-white hover:bg-blue-600"
        >
         <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
      {renderCalendar()}
    </div>
  );
}
