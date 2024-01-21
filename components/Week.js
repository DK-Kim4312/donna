'use client'
import React, { useContext, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import GlobalContext from '../context/GlobalContext';
import styles from '../styles/WeekView.module.css';
import TimeSlot from './TimeSlot';
import EventFrame from './EventFrame';
import EventBlock from './EventBlock';


export default function Week() {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const { daySelected } = useContext(GlobalContext);
  const testEvents = [
    {
      'id': '1', // this is the id of the event, it should be unique
      'name': 'event 1',
      'startDate': dayjs(),
      'endDate': dayjs().add(1, 'hour'),
    },
    {
      'id': '2',
      'name': 'event 2',
      'startDate': dayjs().add(1, 'day'),
      'endDate': dayjs().add(1, 'day').add(1, 'hour'),
    },
    {
      'id': '3',
      'name': 'event 3',
      'startDate': dayjs().add(2, 'day'),
      'endDate': dayjs().add(2, 'day').add(1, 'hour'),
    },

  ]

  const widthPerDay = 1000 / 7;
  const heightPerMinute = 700 / 1440;

  // functions for events
  function getPixelsFromTop(date) {
    const minutes = dayjs(date).hour() * 60 + dayjs(date).minute();
    return minutes * heightPerMinute;
  }

  function getPixelsFromLeft(date) {
    const weekDay = dayjs(date).format('ddd')
    if (weekDay === 'Sun') {
      return 0;
    } else if (weekDay === 'Mon') {
      return widthPerDay;
    } else if (weekDay === 'Tue') {
      return widthPerDay * 2;
    } else if (weekDay === 'Wed') {
      return widthPerDay * 3;
    } else if (weekDay === 'Thu') {
      return widthPerDay * 4;
    } else if (weekDay === 'Fri') {
      return widthPerDay * 5;
    } else if (weekDay === 'Sat') {
      return widthPerDay * 6;
    }
  }

  //TODO: implement for events in more than one day
  function getEventHeight(startDate, endDate) {
    const startMinutes = dayjs(startDate).hour() * 60 + dayjs(startDate).minute();
    const endMinutes = dayjs(endDate).hour() * 60 + dayjs(endDate).minute();
    return (endMinutes - startMinutes) * heightPerMinute;
  }


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

  function getElementWidth(id) {
    // if (typeof document !== 'undefined') {
    //   const element = document.getElementById(id);
    //   const rect = element.getBoundingClientRect();
    //   return rect.width;
    // }
    return 800; //vw
  }

  function getElementHeight(id) {
    // if (typeof document !== 'undefined') {
    //   const element = document.getElementById(id);
    //   const rect = element.getBoundingClientRect();
    //   return rect.height;
    // }
    return 800; //vh
  }



  return (
    <div className="bg-white p-4 w-[100%]">
      <div className="flex ml-[3vw]">
        {calendarDays.map((day, index) => (
          <div key={"Weekview" + day} className="flex flex-col">
            <div key={"Weekday" + index} className="bg-[#fff] text-center font-bold border border-y-0 h-6 w-[10vw]">{daysOfWeek[index]}</div>
            <div key={"Day" + index} className="bg-[#fff] text-center text-[#52AB98] font-bold border border-t-0 h-6 w-[10vw]">{dayjs(day).format("MMM DD")}</div>
          </div>
        ))}
      </div>
      <div className="flex">
        <div className="bg-[#fff] text-gray-400 text-[12px] h-12 w-[3vw]">all day</div>
        {calendarDays.map((day, index) => (
          <div key={"Week-Event" + index} className="flex flex-col">
            <div className="bg-[#fff] text-center border border-t-0 h-12 w-[10vw]">{ }</div>
          </div>
        ))}
      </div>
      <div className="relative max-h-[600px] overflow-auto">
        {hours.map((hour) => (
          <div key={"Hours" + hour} className="flex ">
            <div className="bg-[#fff] text-gray-400 text-[12px] w-[3vw]">
              {hour < 10 ? `0${hour}:00` : `${hour}:00`}
            </div>
            <div id='event-box'>
              <div className="inline-flex  justify-between">
                {calendarDays.map((day, index) => (
                  <div key={"Events Box" + index} className="">
                    <TimeSlot date={day} hour={hour} isFrontTime={true} />
                    <TimeSlot date={day} hour={hour} isFrontTime={false} />
                  </div>
                ))}
              </div>
              {testEvents.map((event, index) => {
                const { startDate, endDate } = event;
                const top = getPixelsFromTop(startDate);
                const left = getPixelsFromLeft(startDate);
                const eventHeight = getEventHeight(startDate, endDate);
                const eventWidth = widthPerDay;
                console.log("top", top);
                console.log("left", left);
                console.log("eventHeight", eventHeight);
                console.log("eventWidth", eventWidth);
                <EventBlock
                  key={'Events' + index}
                  eventId={event.id}
                  eventName={event.name}
                  xPosition={left}
                  yPosition={top}
                  height={eventHeight}
                  width={eventWidth} />
              })}
            </div>
          </div>
        ))}

        {/* <EventFrame
            numDays={7}
            events={testEvents}
            height={700}
            width={1000}>

          </EventFrame> */}
      </div>
    </div>
  );
}
