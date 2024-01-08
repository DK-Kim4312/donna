"use client";
import React, {
    useState,
    useEffect,
} from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

export default function ContextProvider(props) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [miniCalendarMonth, setMiniCalendarMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [calendarTypeSelected, setCalendarTypeSelected] = useState(
        "Week"
    );

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
                calendarTypeSelected,
                setCalendarTypeSelected,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
}