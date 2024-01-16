import React from 'react';
import Event from './Event';

export const Day = ({ day, events }) => {
    return (
        <div style={{ border: '1px solid gray', margin: '5px', padding: '5px' }}>
            <h2>{day}</h2>
            {events.map(event => (
                <Event key={event.event_id} event={event} />
            ))}
        </div>
    );
};
