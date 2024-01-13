import React, { useContext, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import GlobalContext from '../context/GlobalContext';
import WeekDay from './WeekDay';

export default function NewWeek() {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const eventsOfWeek = [
        // Sunday
        [],
        // Monday
        [
            {
                startTime: '09:00',
                endTime: '10:30',
                title: 'Meeting with Client A',
            },
            {
                startTime: '14:00',
                endTime: '15:30',
                title: 'Team Standup',
            },
        ],
        // Tuesday
        [
            {
                startTime: '10:00',
                endTime: '11:30',
                title: 'Project Presentation',
            },
            {
                startTime: '15:00',
                endTime: '16:30',
                title: 'Lunch with Colleague',
            },
        ],
        // Wednesday
        [
            {
                startTime: '13:00',
                endTime: '14:30',
                title: 'Workshop on React',
            },
        ],
        // Thursday
        [
            {
                startTime: '08:30',
                endTime: '10:00',
                title: 'Design Review',
            },
        ],
        // Friday
        [
            {
                startTime: '11:00',
                endTime: '12:30',
                title: 'Team Planning',
            },
            {
                startTime: '14:30',
                endTime: '15:30',
                title: 'Coffee Break',
            },
        ],
        // Saturday
        [],
    ];
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
            {/* Render the days and dates */}
            <div className="flex ml-[5vw]">
                {calendarDays.map((day, index) => (
                    <div key={"Weekview" + day} className="flex flex-col">
                        <div key={"Weekday" + index} className="bg-[#fff] text-center font-bold border border-y-0 h-6 w-[9vw]">{daysOfWeek[index]}</div>
                        <div key={"Day" + index} className="bg-[#fff] text-center text-[#52AB98] font-bold border border-t-0 h-6 w-[9vw]">{dayjs(day).format("MMM DD")}</div>
                    </div>
                ))}
            </div>

            {/* Render the "All Day" section */}
            <div className="flex">
                <div className="bg-[#fff] text-gray-400 text-center h-12 w-[5vw]">all day</div>
                {calendarDays.map((day, index) => (
                    <div key={"Week-Event" + index} className="flex">
                        {eventsOfWeek[index].map((event, eventIndex) => (
                            <div key={"Event-" + eventIndex} className="bg-[#fff] text-center border border-t-0 h-12 w-[9vw]">
                                {event.title}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Use the WeekDay component for the vertical events */}
            <WeekDay eventsData={eventsOfWeek} totalHours={24} />

        </div>
    );
}
