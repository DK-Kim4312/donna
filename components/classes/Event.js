import React from 'react';
import { formatDateTime } from '../lib/util';

export const Event = ({ event }) => {
    return (
        <div style={{ border: '1px solid black', margin: '5px', padding: '5px' }}>
            <h3>{event.name}</h3>
            <p>{formatDateTime(event.start.dateTime)} to {formatDateTime(event.end.dateTime)}</p>
            <p>Description: {event.description}</p>
            <p>Priority: {event.priority_level}</p>
            {/* Add more fields as needed */}
        </div>
    );
};
