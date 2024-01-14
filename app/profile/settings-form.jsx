'use client'
import { useCallback, useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import '../globals.css';
import './profile.module.css';

export default function SettingsForm({ session }) {
    const supabase = createClientComponentClient();
    const [loadingGoogle, setLoadingGoogle] = useState(false); // Set initial state to false
    const [googleEvents, setGoogleEvents] = useState(null);

    const syncGoogleEvents = useCallback(async () => {
        try {
            setLoadingGoogle(true);
            const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + session.provider_token
                },
            });
            const data = await response.json();
            setGoogleEvents(data);
        } catch (error) {
            console.error("Error:", error);
            alert('Error loading user data!');
        } finally {
            setLoadingGoogle(false);
        }
    }, [session]);

    return (
        <div className="min-h-screen min-w-screen h-[100%] w-[100%] flex flex-col items-center justify-center bg-[#52ab9833]">
            <button
                onClick={() => syncGoogleEvents()}
                disabled={loadingGoogle}
                className='bg-[#52ab98] hover:bg-[#52ab98] text-white font-bold mt-[20px] py-2 px-4 rounded'
            >
                {loadingGoogle ? 'Loading ...' : 'Sync Google Calendar'}
            </button>

            {googleEvents && googleEvents.items && (
                <ul className='ml-[10vw] mr-[10vw] overflow-auto max-h-[100vh]'>
                    {googleEvents.items.map((event) => (
                        <ul key={event.id} className=' mt-1 ' >
                            <li>
                                <span className='font-bold'>Title:</span> {event.summary}
                            </li>
                            <li>
                                <span className='font-bold'>Start:</span> {event.start.dateTime}
                            </li>
                            <li>
                                <span className='font-bold'>End:</span> {event.end.dateTime}
                            </li>
                            <li>
                                <span className='font-bold'>Description:</span> {event.description}
                            </li>
                            <li>
                                <span className='font-bold'>Location:</span> {event.location}
                            </li>

                        </ul>
                    ))}

                </ul>
            )}
        </div>
    );
}
