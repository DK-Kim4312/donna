import { Event } from "./Event";
import { User } from "./User";

export type CalendarContextType = {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    events: Event[];
    setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
    addEvent: (event: Event) => void;
    editEvent: (event: Event) => void;
    deleteEvent: (event: Event) => void;
    showAddModal: boolean;
    setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
    showEditModal: boolean;
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
    selectedDateStart: Date;
    setSelectedDateStart: React.Dispatch<React.SetStateAction<Date>>;
    selectedDateEnd: Date;
    setSelectedDateEnd: React.Dispatch<React.SetStateAction<Date>>;
    selectedEvent: Event;
    setSelectedEvent: React.Dispatch<React.SetStateAction<Event>>;
    calendarTypeSelected: string;
    setCalendarTypeSelected: React.Dispatch<React.SetStateAction<string>>;
};
