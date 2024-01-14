import React, { useContext, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import GlobalContext from '../context/GlobalContext';


export default function Week() {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const eventsOfWeek = [];
  const { daySelected } = useContext(GlobalContext);

  const [weekStartDate, setStartDate] = useState(getWeekStartDate(daySelected));

  useEffect(() => {
    setStartDate(daySelected.startOf('week'));
  }, [daySelected]);

  function getWeekStartDate(date) {
    return date.clone().startOf('week');
  }

  const calendarDays = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(weekStartDate);
    day.setDate(day.getDate() + i);
    calendarDays.push(day);
  }

  const hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push(i);
  }

  return (
    <div className="bg-white p-4 w-[100%]">
      <div className="flex ml-[5vw]">
        {calendarDays.map((day, index) => (
          <div key={"Weekview" + day} className="flex flex-col">
            <div key={"Weekday" + index} className="bg-[#fff] text-center font-bold border border-y-0 h-6 w-[9.5vw]">{daysOfWeek[index]}</div>
            <div key={"Day" + index} className="bg-[#fff] text-center text-[#52AB98] font-bold border border-t-0 h-6 w-[9.5vw]">{dayjs(day).format("MMM DD")}</div>
          </div>
        ))}
      </div>
      <div className="flex">
        <div className="bg-[#fff] text-gray-400 text-center h-12 w-[5vw]">all day</div>
        {calendarDays.map((day, index) => (
          <div key={"Week-Event" + index} className="flex">
            <div className="bg-[#fff] text-center border border-t-0 h-12 w-[9.5vw]">{eventsOfWeek[index]}</div>
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
                  <div className="bg-[#fff] p-2 text-center border w-[9.5vw] h-12">{eventsOfWeek[index]}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
