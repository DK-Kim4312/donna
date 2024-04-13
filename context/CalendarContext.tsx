"use client"
import React, { useContext, createContext, useEffect } from 'react';
import { CalendarContextType } from '../types/CalendarContextType';
import { Event } from '../types/Event';
import { User } from '../types/User';
import { createClient } from "../utils/supabase/client";


export const CalendarContext = createContext<CalendarContextType>(
    {} as CalendarContextType
);

type CalendarContextProviderProps = {
    session_user: any;
    accessToken: string | undefined;
    children: React.ReactNode;
};

export const CalendarContextProvider: React.FC<CalendarContextProviderProps> = ({ session_user, accessToken, children }) => {
    const supabase = createClient();
    const [user, setUser] = React.useState<User>({} as User);
    const [events, setEvents] = React.useState<Event[]>([]);
    const [showAddModal, setShowAddModal] = React.useState<boolean>(false);
    const [showEditModal, setShowEditModal] = React.useState<boolean>(false);
    const [selectedDateStart, setSelectedDateStart] = React.useState<Date>(new Date());
    const [selectedDateEnd, setSelectedDateEnd] = React.useState<Date>(new Date());
    const [selectedEvent, setSelectedEvent] = React.useState<Event>({} as Event);
    const [calendarTypeSelected, setCalendarTypeSelected] = React.useState<string>('Week');


    useEffect(() => {
        async function fetchUserData() {
            let user_id = session_user.id;
            if (user_id) {
                const response = await fetch(`/api/user/get/${user_id}`);
                if(response.ok) {
                    const data = await response.json();
                    setUser(data);
                }
            }
        } 
        if(session_user) {
            fetchUserData();
        }
        

    } , [session_user])

    useEffect(() => {
        const {
            data: { subscription: authListener },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.access_token !== accessToken) {
                // refresh
                window.location.reload();
            }
        });

        return () => {
            authListener?.unsubscribe();
        };
    }, [accessToken, supabase]);

    async function addEvent(event: Event) {
        setEvents([...events, event]);
        const response_push = await fetch('/api/event/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        });
        if (response_push.ok) {
            // Handle success
            console.log("Event created successfully");
        } else {
            // Handle errors
            console.error("Error creating event");
        }
    }

    async function editEvent(event: Event){
        const index = events.findIndex(e => e.id === event.id);
        const newEvents = [...events];
        newEvents[index] = event;

        setEvents(newEvents);
        const response_update = await fetch('/api/event/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        });
        if (response_update.ok) {
            // Handle success
            console.log("Event edited successfully");


        } else {
            // Handle errors
            console.error("Error updating event");
        }
    }

    async function deleteEvent(event: Event){
        const newEvents = events.filter(e => e.id !== event.id);
        setEvents(newEvents);
        const response_delete = await fetch('/api/event/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        });
        if (response_delete.ok) {
            // Handle success
            console.log("Event deleted successfully");

        } else {
            // Handle errors
            console.error("Error deleting event");
        }
    }

    return (
        <CalendarContext.Provider value={{
            user,
            setUser,
            events,
            setEvents,
            addEvent,
            editEvent,
            deleteEvent,
            showAddModal,
            setShowAddModal,
            showEditModal,
            setShowEditModal,
            selectedDateStart,
            setSelectedDateStart,
            selectedDateEnd,
            setSelectedDateEnd,
            selectedEvent,
            setSelectedEvent,
            calendarTypeSelected,
            setCalendarTypeSelected
        }}>
            {children}
        </CalendarContext.Provider>
    )
}
