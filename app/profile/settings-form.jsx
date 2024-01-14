'use client'
import { useCallback, useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import '../globals.css';
import './profile.module.css';

export default function ProfileForm({ session }) {
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

    useEffect(() => {
        syncGoogleEvents();
    }, [syncGoogleEvents]);

    return (
        <div className="min-h-screen min-w-screen h-[100%] w-[100%] flex items-center justify-center">
            <button
                onClick={() => syncGoogleEvents()}
                disabled={loadingGoogle}
            >
                {loadingGoogle ? 'Loading ...' : 'Sync Google Calendar'}
            </button>

            {googleEvents && googleEvents.items && (
                <ul>
                    {googleEvents.items.map((event) => (
                        <li key={event.id}>{event.summary}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
