"use client";
import React, {
    useState,
    useEffect,
    useReducer,
} from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

export const INIT_EVENTS = "INIT_EVENTS";
export const PUSH_EVENT = "PUSH_EVENT";
export const UPDATE_EVENT = "UPDATE_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";

// event reducer
async function eventsReducer(events, action) {
    switch (action.type) {
        case INIT_EVENTS:
            return action.payload;
        case PUSH_EVENT:
            const newEvent = action.payload;
            const response_push = await fetch('/api/event/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            });
            if (response_push.ok) {
                // Handle success
                toast.success("Event created successfully");


            } else {
                // Handle errors
                toast.error("Error creating event");
            }

            return [...events, action.payload];
        case UPDATE_EVENT:
            const response_update = await fetch('/api/event/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            });
            if (response_update.ok) {
                // Handle success
                toast.success("Event edited successfully");


            } else {
                // Handle errors
                toast.error("Error updating event");
            }
            return events.map((event) =>
                event.id === action.payload.id ? action.payload : event
            );
        case DELETE_EVENT:
            const response_delete = await fetch('/api/event/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(action.payload),
            });
            if (response_delete.ok) {
                // Handle success
                toast.success("Event deleted successfully");

            } else {
                // Handle errors
                toast.error("Error deleting event");
            }
            return events.filter((event) => event.id !== action.payload.id);
        default:
            return events;
    }
}

export default function ContextProvider({ children }) {
    const [user, setUser] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedDateStart, setSelectedDateStart] = useState(new Date());
    const [selectedDateEnd, setSelectedDateEnd] = useState(new Date());
    const [calendarTypeSelected, setCalendarTypeSelected] = useState(
        "Week"
    );
    const [events, dispatchCalEvent] = useReducer(
        eventsReducer,
        [],
        initEvents

    );

    function initEvents() {
        async function fetchEvents() {
            const response = await fetch(`/api/event/getAll/${user.id}`)
            const data = await response.json()
            dispatchCalEvent({ type: INIT_EVENTS, payload: data });

        }
        if (user && user.id) {
            fetchEvents()
        }
    }

    useEffect(() => {
        initEvents()
    }, [user])

    return (
        <GlobalContext.Provider
            value={{
                user,
                setUser,
                showDeleteModal,
                setShowDeleteModal,
                showAddModal,
                setShowAddModal,
                showEditModal,
                setShowEditModal,
                selectedEvent,
                setSelectedEvent,
                selectedDateStart,
                setSelectedDateStart,
                selectedDateEnd,
                setSelectedDateEnd,
                calendarTypeSelected,
                setCalendarTypeSelected,
                events,
                dispatchCalEvent,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}