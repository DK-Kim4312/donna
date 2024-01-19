import React, { useState } from 'react';
import styles from '../styles/WeekView.module.css';
import dayjs from 'dayjs';


export default function TimeSlot({ date, hour, isFrontTime }) {
    const [events, setEvents] = useState([]);

    function handleOnDrop(e) {
        let eventType = e.dataTransfer.getData("eventType");
        setEvents([...events, eventType]);
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleOnDrag(e, eventType) {
        e.dataTransfer.setData("event", eventType);
    }

    if (events.length == 0) {
        if (dayjs(date).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") && hour === dayjs().hour() && dayjs().minute() >= 0 && dayjs().minute() <= 29 && isFrontTime) {
            setEvents(["Current Time"]);
        } else if (dayjs(date).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") && hour === dayjs().hour() && dayjs().minute() >= 30 && dayjs().minute() <= 59) {
            setEvents(["Current Time"]);
        }
    }
    // if (events.length == 1 ) {
    //     if( dayjs(date).format("DD/MM/YYYY") !== dayjs().format("DD/MM/YYYY") || hour !== dayjs().hour()) {
    //         setEvents([]);
    //     } else if (dayjs().minute() >= 0 && dayjs().minute() <= 29 && !isFrontTime) {
    //         setEvents([]);
    //     } else if(dayjs().minute() >= 30 && dayjs().minute() <= 59 && isFrontTime) {
    //         setEvents([]);
    //     }
    // }




    if (isFrontTime) {
        return (
            <div className="relative bg-[#fff] text-center border border-t-0 border-b-0 h-6 w-[10vw]" onDrop={handleOnDrop} onDragOver={handleDragOver}>
                {
                    events.map((event, index) => (
                        <div key={"Slot-Event" + index} className='event' draggable onDragStart={(e) => handleOnDrag(e, index)} >
                            {event}
                        </div>
                    ))
                }
            </div>
        )

    } else {
        return (
            <div className={styles['special-border']} onDrop={handleOnDrop} onDragOver={handleDragOver}>
                {
                    events.map((event, index) => (
                        <div key={"Slot-Event" + index} className='event' draggable onDragStart={(e) => handleOnDrag(e, index)} >
                            {event}
                        </div>
                    ))
                }
            </div>
        )
    }
}