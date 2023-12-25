import React from 'react';
import styles from '../styles/DonnaCalendar.module.css';

const daysOfWeek = ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hoursOfDay = Array.from({ length: 25 }, (_, i) => i); // Hours from 00:00 to 24:00

export default function DonnaCalendar() {
    return (
        // top buttons
        <div className="flex flex-col">
            <div className="flex items-center p-4 border-b">
                <div className="flex space-x-0.5">
                    <button className="bg-gray-300 rounded-l-lg p-1">{`<`}</button>
                    <button className="bg-gray-300 p-1">Today</button>
                    <button className="bg-gray-300 rounded-r-lg p-1">{`>`}</button>
                </div>
                <div className="flex ml-20 space-x-3">
                    <button className={styles.button} variant="ghost">
                        Day
                    </button>
                    <button className={styles.button} variant="ghost">
                        Week
                    </button>
                    <button className={styles.button} variant="ghost">
                        Month
                    </button>
                    <button className={styles.button} variant="ghost">
                        Year
                    </button>
                </div>

            </div>
            { /* calendar */}
            <div className="container mx-auto mt-8">
                <div className="grid grid-cols-8">
                    {/* Days of the week */}
                    {daysOfWeek.map((day, index) => (
                        <div key={index} className="text-center font-semibold">{day}</div>
                    ))}

                    <div className='flex flex-col overflow-x-hidden overflow-y-auto'>
                        {/* Hours of the day */}
                        {hoursOfDay.map((hour) => (
                            <div key={hour} className="p-2 align-left mb-10">
                                {hour > 12 ? `${hour - 12}pm` : `${hour}am`}
                            </div>
                        ))}
                    </div>



                </div>
            </div>
        </div>
    )
}

