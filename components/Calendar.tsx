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
import dayjs from 'dayjs';
import { toast } from "sonner"

// TODO: When dragging and selecting a date, the modal should appear with the date selected
// TODO: add use callback to handle the event

interface Event {
  id: number;
  title: string;
  start: Date | string;
  end: Date | string;
  allDay: boolean;

  extendedProps: {
    description: string;
    recurring: boolean;
    priority: number;
    location: string;
    created_by: string;
    created_date: Date | string;
  }
}

export default function Calendar() {
  const [allEvents, setAllEvents] = useState<Event[]>([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [idToDelete, setIdToDelete] = useState<number | null>(null)
  const [idToEdit, setIdToEdit] = useState<number | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const [title, setTitle] = useState<String>();
  const [description, setDescription] = useState<String>('');

  const [start, setStart] = useState<Date>("");
  const [end, setEnd] = useState<Date>("");
  const [allDay, setAllDay] = useState<boolean>(false);
  const [flexible, setFlexible] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [priority, setPriority] = useState(3);
  const [newEvent, setNewEvent] = useState<Event>(
    {
      id: 0,
      title: '',
      start: '',
      end: '',
      allDay: false,
      extendedProps: {
        description: '',
        recurring: false,
        priority: 3,
        location: '',
        created_by: '',
        created_date: ''
      }
    }
  )

  function handlePriorityChange(newPriority) {
    setPriority(newPriority);
  }

  function handleDateClick(arg: { date: Date, allDay: boolean }) {
    setTitle('')
    setStart(arg.date.toISOString())
    setEnd(dayjs(arg.date).add(1, 'hour').toDate().toISOString())
    setAllDay(arg.allDay)
    setFlexible(false)
    setRepeat(false)
    setPriority(3)
    setDescription('')
    setNewEvent({
      id: allEvents.length + 1,
      title: title,
      start: start,
      end: end,
      allDay: allDay,
      extendedProps: {
        description: description,
        recurring: repeat,
        priority: priority,
        created_by: 'user',
        created_date: new Date().toISOString()
      }
    })
    setShowAddModal(true)
  }

  function handleEventClick(arg: { event: Event }) {
    handleEditModal(arg)
    console.log(arg.event)
  }

  function handleEditModal(data: { event: { id: string } }) {
    setShowEditModal(true)
    setIdToEdit(Number(data.event.id))
    setIdToDelete(Number(data.event.id))
  }

  function handleDeleteModal() {
    setShowDeleteModal(true)
  }

  function handleDelete() {
    if (window.confirm("Are you sure you want to change the event date?")) {

      setAllEvents(allEvents.filter(event => Number(event.id) !== Number(idToDelete)))
      setShowEditModal(false)
      setIdToDelete(null)
      setIdToEdit(null)
    }
  }

  function handleCloseAddModal(e) {
    e.preventDefault()
    setShowAddModal(false)
  }

  function handleCloseDeleteModal(e) {
    e.preventDefault()
    setShowDeleteModal(false)
    setIdToDelete(null)
  }

  function handleCloseEditModal(e) {
    e.preventDefault()
    setShowEditModal(false)
  }



  function handleSubmitAdd(e) {
    e.preventDefault()
    const newEvent = {
      id: allEvents.length + 1,
      title: title,
      start: start,
      end: end,
      allDay: allDay,
      extendedProps: {
        description: description,
        recurring: repeat,
        priority: priority,
        location: '',
        created_by: 'user',
        created_date: new Date().toISOString()
      }
    }
    setAllEvents([...allEvents, newEvent])
    toast("Event has been created.");
    setShowAddModal(false)
  }

  function handleSubmitEdit(e) {
    e.preventDefault()
    const updatedEvent = {
      id: newEvent.id,
      title: title,
      start: start,
      end: end,
      allDay: allDay,
      extendedProps: {
        description: description,
        recurring: repeat,
        priority: priority,
        location: '',
        created_by: 'user',
        created_date: new Date().toISOString()
      }
    }
    setAllEvents(allEvents.map(event => event.id === updatedEvent.id ? updatedEvent : event))
    toast("Event has been updated.");
    setShowEditModal(false)
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

        <Transition.Root show={showDeleteModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setShowDeleteModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"

            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg
                   bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                  >
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center 
                      justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Delete Event
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to delete this event?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm 
                      font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={handleDelete}>
                        Delete
                      </button>
                      <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 
                      shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={handleCloseDeleteModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        <Transition.Root show={showAddModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setShowAddModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <form className="bg-white rounded-lg shadow-2xl w-[500px]">
                    <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                      <span className="material-icons-outlined text-gray-400">
                        Add Event
                      </span>
                      <div>
                        <button onClick={(e) => handleCloseAddModal}>
                          <span className="material-icons-outlined text-gray-400">
                            close
                          </span>
                        </button>
                      </div>
                    </header>
                    <div className="p-3">
                      <div className="grid grid-cols-1/5 items-end gap-y-7">
                        <input
                          type="text"
                          name="title"
                          placeholder="Add title"
                          value={title}
                          className="pt-1 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-[#52ab98]"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DateTimePicker
                            label="startDate"
                            value={dayjs(start)}
                            className=" w-full focus:border-[#52ab98]"
                            onChange={(newDate) => setStart(newDate)}
                          />
                          <DateTimePicker
                            label="endDate"
                            value={dayjs(end)}
                            className="w-full focus:border-[#52ab98]"
                            onChange={(newDate) => setEnd(newDate)}
                          />
                        </LocalizationProvider>

                        <SwitchCheckbox
                          label="All Day"
                          checked={allDay}
                          onChange={(e) => setAllDay(e.target.checked)}
                        />
                        <SwitchCheckbox
                          label="Flexible"
                          checked={flexible}
                          onChange={(e) => setFlexible(e.target.checked)}
                        />
                        <SwitchCheckbox
                          label="Repeat"
                          checked={repeat}
                          onChange={(e) => setRepeat(e.target.checked)}
                        />
                        <div className="inline-flex">
                          <HoverRating
                            label="Priority Level"
                            level={priority}
                            onChange={handlePriorityChange}
                          />
                        </div>

                        <input
                          type="text"
                          name="description"
                          placeholder="Add a description"
                          value={description}
                          className="pt-1 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-[#52ab98]"
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                    <footer className="flex justify-end border-t p-3 mt-5">
                      <button
                        type="submit"
                        onClick={handleSubmitAdd}
                        className="bg-[#52ab98] hover:bg-blue-600 px-6 py-2 rounded text-white"
                      >
                        Save
                      </button>
                    </footer>
                  </form>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        <Transition.Root show={showEditModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setShowEditModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <form className="bg-white rounded-lg shadow-2xl w-[500px]">
                    <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                      <span className="material-icons-outlined text-gray-400">
                        Edit Event
                      </span>
                      <div>
                        <button onClick={(e) => handleCloseEditModal}>
                          <span className="material-icons-outlined text-gray-400">
                            close
                          </span>
                        </button>
                      </div>
                    </header>
                    <div className="p-3">
                      <div className="grid grid-cols-1/5 items-end gap-y-7">
                        <input
                          type="text"
                          name="title"
                          placeholder="Add title"
                          value={title}
                          className="pt-1 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-[#52ab98]"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DateTimePicker
                            label="startDate"
                            value={dayjs(start)}
                            className=" w-full focus:border-[#52ab98]"
                            onChange={(newDate) => setStart(newDate)}
                          />
                          <DateTimePicker
                            label="endDate"
                            value={dayjs(end)}
                            className="w-full focus:border-[#52ab98]"
                            onChange={(newDate) => setEnd(newDate)}
                          />
                        </LocalizationProvider>

                        <SwitchCheckbox
                          label="All Day"
                          checked={allDay}
                          onChange={(e) => setAllDay(e.target.checked)}
                        />
                        <SwitchCheckbox
                          label="Flexible"
                          checked={flexible}
                          onChange={(e) => setFlexible(e.target.checked)}
                        />
                        <SwitchCheckbox
                          label="Repeat"
                          checked={repeat}
                          onChange={(e) => setRepeat(e.target.checked)}
                        />
                        <div className="inline-flex">
                          <HoverRating
                            label="Priority Level"
                            level={priority}
                            onChange={handlePriorityChange}
                          />
                        </div>

                        <input
                          type="text"
                          name="description"
                          placeholder="Add a description"
                          value={description}
                          className="pt-1 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-[#52ab98]"
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                    <footer className="flex justify-end border-t p-3 mt-5">
                      <button
                        type="submit"
                        onClick={handleDelete}
                        className="bg-[#52ab98] hover:bg-blue-600 px-6 py-2 rounded text-white"
                      >
                        Delete
                      </button>
                      <button
                        type="submit"
                        onClick={handleSubmitEdit}
                        className="bg-[#52ab98] hover:bg-blue-600 px-6 py-2 rounded text-white"
                      >
                        Save
                      </button>
                    </footer>
                  </form>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </main >
    </>
  );
}