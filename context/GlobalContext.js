import React from "react";

const GlobalContext = React.createContext(
    {
        monthIndex: 0,
        setMonthIndex: (index) => {},
        miniCalendarMonth: 0,
        setMiniCalendarMonth: (index) => {},
        setDaySelected: (day) => {},
        daySelected: null,
        showEventModal: false,
        setShowEventModal: () => {},
        calendarTypeSelected: null,
        setCalendarTypeSelected: () => {},
        
        
    }
);

export default GlobalContext;