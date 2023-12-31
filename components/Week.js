import React, { useState } from 'react';
import dayjs from 'dayjs';

export default function Week() {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
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
      <div className="">
        <div className="flex ml-[8vw]">
          {calendarDays.map((day, index) => (
            <div key={index} className="flex">
              <div className="bg-[#fff] text-center border border-t-0 h-12 w-[8vw]">{daysOfWeek[index]+"\n"+dayjs(day).format("MMM DD")}</div>
            </div>
          ))}
        </div>
        <div className="flex">
        <div className="bg-[#fff] text-center h-12 w-[8vw]">all day</div>
          {calendarDays.map((day, index) => (
            <div key={index} className="flex">
              <div className="bg-[#fff] text-center border border-t-0 h-12 w-[8vw]">{eventsOfWeek[index]}</div>
            </div>
          ))}
        </div>
        <div className="max-h-[600px] overflow-auto">
          {hours.map((hour) => (
            <div className="flex ">
              <div key={hour} className="bg-[#fff] p-2 text-center w-[8vw]">
                {hour < 10 ? `0${hour}:00` : `${hour}:00`}
              </div>
              <div className="inline-flex  justify-between">
                {calendarDays.map((day, index) => (
                  <div key={index} className="">
                    <div className="bg-[#fff] p-2 text-center border w-[8vw] h-12">{eventsOfWeek[index]}</div>
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
      <div className="flex mb-4">
        <button
          onClick={previousWeek}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
        >
          Previous Week
        </button>
        <button
          onClick={nextWeek}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
        >
          Next Week
        </button>
      </div>
      {renderCalendar()}
    </div>
  );
}
