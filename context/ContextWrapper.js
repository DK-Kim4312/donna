import React, {
    useState,
    useEffect,
    useReducer,
    useMemo,
} from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

const PUSH_EVENT = "PUSH_EVENT";
const UPDATE_EVENT = "UPDATE_EVENT";
const DELETE_EVENT = "DELETE_EVENT";

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
    const storageEvents = localStorage.getItem("savedEvents");
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
    return parsedEvents;
}

export default function ContextWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [yearIndex, setYearIndex] = useState(dayjs().year());
    const [weekIndex, setWeekIndex] = useState(dayjs().week());
    const [dayIndex, setDayIndex] = useState(dayjs().date());
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [miniCalendarMonth, setMiniCalendarMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [labels, setLabels] = useState([]);
    const [savedEvents, dispatchCalEvent] = useReducer(
        savedEventsReducer,
        [],
        initEvents
    );

    const filteredEvents = useMemo(() => {
        return savedEvents.filter((evt) =>
            labels
                .filter((lbl) => lbl.checked)
                .map((lbl) => lbl.label)
                .includes(evt.label)
        );
    }, [savedEvents, labels]);

    useEffect(() => {
        localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    }, [savedEvents]);

    useEffect(() => {
        setLabels((prevLabels) => {
            return [...new Set(savedEvents.map((evt) => evt.label))].map(
                (label) => {
                    const currentLabel = prevLabels.find(
                        (lbl) => lbl.label === label
                    );
                    return {
                        label,
                        checked: currentLabel ? currentLabel.checked : true,
                    };
                }
            );
        });
    }, [savedEvents]);

    useEffect(() => {
        if (user) {
            setIsLoggedIn(true);
        }
    }
        , [user]);

    useEffect(() => {
        if (isLoggedIn) {
            setUser(user);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (daySelected !== null) {
            setDayIndex(daySelected.date());
            setWeekIndex(daySelected.week());
            setYearIndex(daySelected.year());
            setMonthIndex(daySelected.month());
        }
    } , [daySelected]);

    useEffect(() => {
        if (miniCalendarMonth !== null) {
            setMonthIndex(miniCalendarMonth);
        }
    }, [miniCalendarMonth]);

    useEffect(() => {
        if (!showEventModal) {
            setSelectedEvent(null);
        }
    }, [showEventModal]);

    useEffect(() => {
        setLabels((prevLabels) => {
          return [...new Set(savedEvents.map((evt) => evt.label))].map(
            (label) => {
              const currentLabel = prevLabels.find(
                (lbl) => lbl.label === label
              );
              return {
                label,
                checked: currentLabel ? currentLabel.checked : true,
              };
            }
          );
        });
      }, [savedEvents]);

    function updateLabel(label) {
        setLabels(
          labels.map((lbl) => (lbl.label === label.label ? label : lbl))
        );
      }

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                dayIndex,
                setDayIndex,
                weekIndex,
                setWeekIndex,
                yearIndex,
                setYearIndex,
                monthIndex,
                setMonthIndex,
                miniCalendarMonth: miniCalendarMonth,
                setMiniCalendarMonth: setMiniCalendarMonth,
                daySelected,
                setDaySelected,
                showEventModal,
                setShowEventModal,
                dispatchCalEvent,
                selectedEvent,
                setSelectedEvent,
                savedEvents,
                setLabels,
                labels,
                updateLabel,
                filteredEvents,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
}
