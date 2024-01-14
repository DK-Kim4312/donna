"use client";
import React, {
    useState,
    useEffect,
    useReducer,
} from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

export const PUSH_EVENT = "PUSH_EVENT";
export const UPDATE_EVENT = "UPDATE_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";
function savedEventsReducer(state, { type, payload }) {
    switch (type) {
        case PUSH_EVENT:
            return [...state, payload];
        case UPDATE_EVENT:
            return state.map((evt) =>
                evt.id === payload.id ? payload : evt
            );
        case DELETE_EVENT:
            return state.filter((evt) => evt.id !== payload.id);
        default:
            throw new Error();
    }
}
function initEvents() {
    if (typeof window === "undefined") {
        return [];
    }
    return JSON.parse(localStorage.getItem("savedEvents")) || [];
}
export default function ContextProvider(props) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [miniCalendarMonth, setMiniCalendarMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [calendarTypeSelected, setCalendarTypeSelected] = useState(
        "Week"
    );
    const [savedEvents, dispatchCalEvent] = useReducer(
        savedEventsReducer,
        [],
        initEvents
    );

    useEffect(() => {
        if (!showEventModal) {
            setSelectedEvent(null);
        }
    }, [showEventModal]);

    useEffect(() => {
        if (miniCalendarMonth !== null) {
            setMonthIndex(miniCalendarMonth);
        }
    }, [miniCalendarMonth]);

    return (
        <GlobalContext.Provider
            value={{
                monthIndex,
                setMonthIndex,
                miniCalendarMonth,
                setMiniCalendarMonth,
                setDaySelected,
                daySelected,
                showEventModal,
                setShowEventModal,
                selectedEvent,
                setSelectedEvent,
                calendarTypeSelected,
                setCalendarTypeSelected,
                savedEvents,
                dispatchCalEvent,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
}