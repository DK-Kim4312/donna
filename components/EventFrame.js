import React from 'react';
import EventBlock from './EventBlock';
import dayjs from 'dayjs';

export default function EventFrame({ numDays, height, width, events }) {
  const widthPerDay = width / numDays;
  const heightPerMinute = height / 1440;

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
    const startMinutes =dayjs(startDate).hour() * 60 + dayjs(startDate).minute();
    const endMinutes = dayjs(endDate).hour() * 60 + dayjs(endDate).minute();
    console.log((endMinutes - startMinutes) * heightPerMinute);
    return (endMinutes - startMinutes) * heightPerMinute;
  }

  return (
    <div className='overflow-auto'>
      {events.map((event, index) => {
        const { startDate, endDate } = event;
        const top = getPixelsFromTop(startDate);
        const left = getPixelsFromLeft(startDate);
        const eventHeight = getEventHeight(startDate, endDate);
        const eventWidth = widthPerDay;
        console.log('top', top);
        console.log('left', left);

          <EventBlock key={'Events' + index} eventId={event.id} eventName={event.name} xPosition={left} yPosition={top} height={eventHeight} width={eventWidth}/>
      })}

    </div>
  );



}





