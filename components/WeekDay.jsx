import React from 'react';

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
        {eventsData.map((event) => (
          <div
            key={event.title}
            className={`p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {event.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekDay;
