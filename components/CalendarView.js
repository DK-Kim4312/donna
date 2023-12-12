// components/CalendarView.js
import React from 'react';
import styles from '../styles/Calendar.module.css';

const CalendarView = () => {
  // Function to generate an array of days in the current week starting from Monday
  const getDaysInWeek = () => {
    const currentDate = new Date();
    const daysInWeek = [];

    // Find the previous Monday
    currentDate.setDate(currentDate.getDate() - ((currentDate.getDay() + 6) % 7));

    for (let i = 0; i < 7; i++) {
      const day = new Date(currentDate);
      day.setDate(currentDate.getDate() + i);
      daysInWeek.push(day);
    }

    return daysInWeek;
  };

  const daysInWeek = getDaysInWeek();

  // Function to generate an array of 3-hour intervals in a day
  const getHoursInDay = () => {
    const hoursInDay = [];

    for (let hour = 0; hour < 24; hour += 3) {
      hoursInDay.push(hour);
    }

    return hoursInDay;
  };

  const hoursInDay = getHoursInDay();

  return (
    <div className={styles.calendarview}>
      <h2>Week View</h2>
      <table className={styles.calendarTable}>
        <thead>
          <tr>
            <th>Time</th>
            {daysInWeek.map((day, index) => (
              <th key={index}>
                {day.toLocaleDateString('default', { weekday: 'short' })}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hoursInDay.map((hour, hourIndex) => (
            <tr key={hourIndex}>
              <td>{`${hour}:00 ~ ${hour+3}:00`}</td>
              {daysInWeek.map((day, dayIndex) => (
                <td key={dayIndex} className={styles.calendarday}>
                  {/* You can render events for this hour and day here */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarView;
