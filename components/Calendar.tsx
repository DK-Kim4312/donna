"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { EventSourceInput } from '@fullcalendar/core/index.js'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import HoverRating from "../styles/objects/HoverRating";
import SwitchCheckbox from "../styles/objects/SwitchCheckbox";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { toast } from "sonner"
import { Event } from "../types/Event"
import CreateEventModal from './CreateEventModal';
import EditEventModal from './EditEventModal';
import { v4 as uuidv4 } from 'uuid';

// TODO: When dragging and selecting a date, the modal should appear with the date selected
// TODO: add use callback to handle the event

export default function Calendar({ user }) {
  const [allEvents, setAllEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [numEvents, setNumEvents] = useState(0)

  const [clickedTimeStart, setClickedTimeStart] = useState<Date>(new Date());
  const [clickedTimeEnd, setClickedTimeEnd] = useState<Date>(new Date());

  const [clickedEvent, setClickedEvent] = useState<Event>({} as Event);


  // get all events
  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch(`/api/event/getAll/${user.id}`)
      const data = await response.json()
      setAllEvents(data)
    }
    if (user) {
      fetchEvents()
    }

    setLoading(false)

  }, [numEvents])


  function handleEventClick(arg: { event }) {
    // cast to Event add user_id

    let selectedEvent = {} as Event;
    selectedEvent.id = arg.event.id
    selectedEvent.title = arg.event.title
    selectedEvent.start = arg.event.start
    selectedEvent.end = arg.event.end
    selectedEvent.allDay = arg.event.allDay
    selectedEvent.user_id = user.id

    setClickedEvent(selectedEvent)
    setShowEditModal(true)
  }

  function handleDateClick(arg) {
    setShowAddModal(true)

    let curDateTime = new Date(arg.dateStr)
    let curDateTimeEnd = new Date(arg.dateStr)
    curDateTimeEnd.setHours(curDateTime.getHours() + 1)

    setClickedTimeStart(curDateTime)
    setClickedTimeEnd(curDateTimeEnd)
  }

  if (loading) {
    return <div>Loading...</div>
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
              events={allEvents as EventSourceInput}
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

        {showAddModal && (
          <CreateEventModal
            showAddModal={showAddModal}
            setShowAddModal={setShowAddModal}
            user={user}
            numEvents={numEvents}
            setNumEvents={setNumEvents}
            inputStart={clickedTimeStart}
            inputEnd={clickedTimeEnd}
          />)
        }

        {showEditModal && (
          <EditEventModal
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
            user={user}
            numEvents={numEvents}
            setNumEvents={setNumEvents}
            event_id={clickedEvent.id}
            original_title={clickedEvent.title}
            original_start={clickedEvent.start}
            original_end={clickedEvent.end}
            original_allDay={clickedEvent.allDay}
          />)
        }




      </main >
    </>
  );
}