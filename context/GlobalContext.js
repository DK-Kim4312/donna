import React from "react";

const GlobalContext = React.createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => { },
    user: null,
    setUser: () => { },
    dayIndex: 0,
    setDayIndex: (index) => { },
    weekIndex: 0,
    setWeekIndex: (index) => { },
    yearIndex: 0,
    setYearIndex: (index) => { },
    /*implemented*/
    monthIndex: null,
    setMonthIndex: (index) => {},
    miniCalendarMonth: 0,
    setMiniCalendarMonth: (index) => {},
    daySelected: null,
    setDaySelected: (day) => {},
    showEventModal: false,
    setShowEventModal: () => {},
    dispatchCalEvent: ({ type, payload }) => {},
    savedEvents: [],
    selectedEvent: null,
    setSelectedEvent: () => {},
    setLabels: () => {},
    labels: [],
    updateLabel: () => {},
    filteredEvents: [],
});

export default GlobalContext;
