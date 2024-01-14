import React from 'react';
import EventBlock from './EventBlock.jsx'

const WeekDay = ({ eventsData }) => {
  // Calculate the total number of hours (adjust this based on your needs)
  const totalHours = 24;

  // Create an array representing hours
  const hours = Array.from({ length: totalHours }, (_, index) => index);

  return (
    <div className="event-timeline">
      <div className="timeline">
        {hours.map((hour) => (
          <div key={hour} className="hour">
            {hour < 10 ? `0${hour}:00` : `${hour}:00`}
          </div>
        ))}
      </div>
      <div className="events">
        <EventBlock eventsData={eventsData}></EventBlock>
      </div>
    </div>
  );
};

export default WeekDay;
