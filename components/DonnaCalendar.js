import React from 'react';

const daysOfWeek = ['','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const hoursOfDay = Array.from({ length: 25 }, (_, i) => i); // Hours from 00:00 to 24:00

export default function DonnaCalendar() {
    return (
        // top buttons
        <div className="flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
                <div className="flex space-x-2">
                    <button className="bg-gray-300">{`<`}</button>
                    <button className="bg-gray-300">Today</button>
                    <button className="bg-gray-300">{`>`}</button>
                </div>
                <div className="flex space-x-2">
                    <button variant="ghost">Day</button>
                    <button variant="ghost">Week</button>
                    <button variant="ghost">Month</button>
                    <button variant="ghost">Year</button>
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

