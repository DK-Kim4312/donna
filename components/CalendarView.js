// components/CalendarView.js
import React from 'react';
import styles from '../styles/Calendar.module.css';

const CalendarView = () => {
  // Function to generate an array of days in the current month
  const getDaysInMonth = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = [];

    for (let date = firstDay; date <= lastDay; date.setDate(date.getDate() + 1)) {
      daysInMonth.push(new Date(date));
    }

    return daysInMonth;
  };

  const daysInMonth = getDaysInMonth();

  return (
    <div className={styles.calendarview}>
      <h2>Calendar View - {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}</h2>
      <table className={styles.calendarTable}>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {daysInMonth.map((date, index) => {
            if (index % 7 === 0) {
              return (
                <tr key={index} className={styles.calendarRow}>
                  {Array.from({ length: 7 }).map((_, dayIndex) => {
                    const dayDate = new Date(date);
                    dayDate.setDate(date.getDate() + dayIndex);
                    return (
                      <td key={dayIndex} className={styles.calendarday}>
                        {dayDate.getDate()}
                      </td>
                    );
                  })}
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarView;
