import CalendarHeader from "./CalendarHeader";
import React, { useState, useContext, useEffect } from "react";
import { getMonth } from "../lib/util";
import Month from "./Month";
import GlobalContext from "../context/GlobalContext";
import EventModal from "./EventModal";


export default function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex, showEventModal } = useContext(GlobalContext);

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);

    return (
        <React.Fragment>
            <div className="h-screen flex flex-col">
                {showEventModal && <EventModal />}
                <CalendarHeader />
                <div className="flex flex-1">
                    <Month month={currentMonth} />
                </div>
            </div>
        </React.Fragment>
    );
}