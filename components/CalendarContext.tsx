"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useEffect, useState, useContext } from 'react'
import { EventSourceInput } from '@fullcalendar/core/index.js'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Event } from "../types/Event"
import GlobalContext from '../context/GlobalContext'
import { v4 as uuidv4 } from 'uuid';

// TODO: When dragging and selecting a date, the modal should appear with the date selected
// TODO: add use callback to handle the event

export default function CalendarContext() {
    const { user, showAddModal, setShowAddModal, showEditModal, setShowEditModal, selectedDateStart, setSelectedDateStart, selectedDateEnd, setSelectedDateEnd, selectedEvent, setSelectedEvent, events, dispatchCalEvent } = useContext(GlobalContext)


    function handleEventClick(arg: { event }) {
        // cast to Event add user_id

        let selectEvent = arg.event as Event
        selectEvent.user_id = user.id
    
        setSelectedEvent(selectEvent)
        setShowEditModal(true)
    }

    function handleDateClick(arg) {
        setShowAddModal(true)

        let curDateTime = new Date(arg.dateStr)
        let curDateTimeEnd = new Date(arg.dateStr)
        curDateTimeEnd.setHours(curDateTime.getHours() + 1)

        setSelectedDateStart(curDateTime)
        setSelectedDateEnd(curDateTimeEnd)
    }

    return (
        <>
            <main className="w-[100%] items-center justify-between p-5">
                <div className="grid grid-cols-8">
                    <div className="col-span-8">
                        <FullCalendar

                            plugins={[
                                dayGridPlugin,
                                interactionPlugin,
                                timeGridPlugin
                            ]}
                            headerToolbar={{
                                left: 'prev,today,next',
                                center: 'timeGridDay,timeGridWeek,dayGridMonth',
                                right: '',
                            }}
                            initialView="timeGridWeek"
                            events={events as EventSourceInput}
                            nowIndicator={true}
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            dateClick={handleDateClick}
                            eventClick={(arg) => handleEventClick(arg)}
                            slotDuration={'01:00:00'}
                            snapDuration={'00:01:00'}
                            defaultTimedEventDuration={'01:00:00'}
                            unselectAuto={true}

                        />
                    </div>
                </div>
            </main >
        </>
    );
}