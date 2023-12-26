import React, { useState, useContext, useEffect } from "react";
import { getMonth } from "../lib/util";
import Month from "./Month";
import GlobalContext from "../context/GlobalContext";
import EventModal from "./EventModal";

export default function CalendarBody() {
    const [currenMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex, showEventModal } = useContext(GlobalContext);

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);

    return (
        <React.Fragment>
            {showEventModal && <EventModal />}
            <div className="flex flex-1">
                <Month month={currenMonth} />
            </div>
        </React.Fragment>
    );
}