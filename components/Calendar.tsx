"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useEffect, useState, useContext, use } from 'react'
import { EventSourceInput } from '@fullcalendar/core/index.js'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Event } from '../types/Event'
import { CalendarContextType } from '../types/CalendarContextType'
import { CalendarContext, CalendarContextProvider } from '../context/CalendarContext'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';


import { v4 as uuidv4 } from 'uuid';

// TODO: When dragging and selecting a date, the modal should appear with the date selected
// TODO: add use callback to handle the event

export default function Calendar() {
    const { user, showAddModal, setShowAddModal, showEditModal, setShowEditModal, selectedDateStart, setSelectedDateStart, selectedDateEnd, setSelectedDateEnd, selectedEvent, setSelectedEvent, events, setEvents } = useContext(CalendarContext)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const initEvents = async () => {
            const response = await fetch(`/api/event/getAll/${user.id}`)
            const data = await response.json()
            setEvents(data)
            setLoading(false)
        }
        if (user.id) {
            initEvents();
        }

        else {
            setLoading(false)
        }
    }, [user]);

    function handleEventClick(arg: { event } ) {
        // cast to Event add user_id

        let selectEvent = {} as Event
        selectEvent.id = arg.event.id
        selectEvent.user_id = user.id
        selectEvent.title = arg.event.title
        selectEvent.start = arg.event.start
        selectEvent.end = arg.event.end
        selectEvent.allDay = arg.event.allDay


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

    if (loading) {
        return (
            <Box sx={{ width: 300 }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
            </Box>
        )
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