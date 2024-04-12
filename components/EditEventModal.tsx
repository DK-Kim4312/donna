import { createClient } from "@/utils/supabase/client";
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import HoverRating from "../styles/objects/HoverRating";
import SwitchCheckbox from "../styles/objects/SwitchCheckbox";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { toast } from "sonner"
import { Event } from "../types/Event"
import { v4 as uuidv4 } from 'uuid';

export default function CreateEventModal({
    showEditModal,
    setShowEditModal,
    user,
    numEvents,
    setNumEvents,
    event_id,
    original_title,
    original_start,
    original_end,
    original_allDay,
}
    : {
        showEditModal: boolean,
        setShowEditModal: (showAddModal: boolean) => void,
        user: any,
        numEvents: number,
        setNumEvents: (numEvents: number) => void
        event_id: string,
        original_title: string,
        original_start: Date,
        original_end: Date,
        original_allDay: boolean
    }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [title, setTitle] = useState<String>(original_title ? original_title : '');
    const [description, setDescription] = useState<String>('');
    const [start, setStart] = useState<Date>(original_start ? original_start : new Date());
    const [end, setEnd] = useState<Date>(original_end ? original_end : new Date());
    const [allDay, setAllDay] = useState<boolean>(original_allDay);
    const [flexible, setFlexible] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [priority, setPriority] = useState(3);

    async function handleEditEvent() {
        if (!user) {
            alert("Please log in to edit event");
            return;
        }
        const newEvent: Event = {
            id: event_id,
            user_id: user.id,
            title: title,
            start: start,
            end: end,
            allDay: allDay,
        }
        const response = await fetch('/api/event/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEvent),
        });
        if (response.ok) {
            // Handle success
            toast.success("Event created successfully");
            setNumEvents(numEvents + 1);

        } else {
            // Handle errors
            toast.error("Error creating event");
        }
    }

    function handleCloseEditModal() {
        setShowEditModal(false);
    }

    function handlePriorityChange(newPriority: number) {
        setPriority(newPriority);
    }

    function handleSubmitEdit(e) {
        e.preventDefault();
        handleEditEvent();
        handleCloseEditModal();
    }


    function handleSubmitDelete(e) {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this event?")) {
            handleDeleteEvent();
            handleCloseEditModal();
        }

    }

    async function handleDeleteEvent() {
        if (!user) {
            alert("Please log in to delete event");
            return;
        }
        const event: Event = {
            id: event_id,
            user_id: user.id,
        }
        const response = await fetch('/api/event/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        });
        if (response.ok) {
            // Handle success
            toast.success("Event deleted successfully");
            setNumEvents(numEvents - 1);

        } else {
            // Handle errors
            toast.error("Error deleting event");
        }
    }


    return (
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
                                        onClick={handleSubmitDelete}
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

    );
}
