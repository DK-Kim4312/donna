// uses FullCalendar library to create a calendar with the ability to add events
// Need MIT license for FullCalendar

import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../styles/FullCalendar.module.css";


const Calendar = () => {
    const [events, setEvents] = useState([]);
    const contextMenuRef = useRef();

    const handleContextMenu = (e) => {
        e.preventDefault();
        contextMenuRef.current.style.display = "block";
        contextMenuRef.current.style.left = `${e.clientX}px`;
        contextMenuRef.current.style.top = `${e.clientY}px`;

        // Get the date of the right-clicked cell
        const systemDate = e.target.closest(".fc-daygrid-day").dataset.date;
        let date = new Date(systemDate);
        // add one day to date
        date.setDate(date.getDate() + 1);
        // 1 hour later for now
        handleAddEvent(new Date(date), new Date(new Date().getTime() + 3600000));
    };

    const handleAddEvent = (start_date, end_date) => {
        const newEvent = {
            id: Math.random().toString(),
            title: "New Event",
            start: start_date,
            end: end_date, // 1 hour later
        };
        setEvents([...events, newEvent]);
        contextMenuRef.current.style.display = "none";
    };

    const handleEventDrop = (info) => {
        const updatedEvents = events.map((event) => {
            if (event.id === info.event.id) {
                return { ...event, start: info.event.start, end: info.event.end };
            }
            return event;
        });
        setEvents(updatedEvents);
    };

    const handleEventResize = (info) => {
        const updatedEvents = events.map((event) => {
            if (event.id === info.event.id) {
                return { ...event, end: info.event.end };
            }
            return event;
        });
        setEvents(updatedEvents);
    };

    return (
        <div onContextMenu={handleContextMenu}>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,dayGridWeek,dayGridDay",
                }}
                initialView="dayGridWeek"
                editable={true}
                droppable={true}
                selectable={true}
                events={events}
                eventDrop={handleEventDrop}
                eventResize={handleEventResize}
            />
            <div
                ref={contextMenuRef}
                className="context-menu"
            //style={{ display: "none" }}
            >
                <button onClick={handleAddEvent}>Add Event</button>
            </div>
        </div>
    );
};
export default Calendar;