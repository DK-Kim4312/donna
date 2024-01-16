import React, { useState } from 'react';
import Day from './Day';
import { transformEvents } from '../lib/util';

const Scheduler = ({ events }) => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const { daySelected } = useContext(GlobalContext);
  
    const [weekStartDate, setStartDate] = useState(getWeekStartDate(daySelected));

    const transformedEvents = transformEvents(events);

    useEffect(() => {
        setStartDate(daySelected.startOf('week'));
      }, [daySelected]);
    
      function getWeekStartDate(date) {
        return date.clone().startOf('week');
      }
    
      const calendarDays = [];
    
      for (let i = 0; i < 7; i++) {
        const day = new Date(weekStartDate);
        day.setDate(day.getDate() + i);
        calendarDays.push(day);
      }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {calendarDays.map(day => (
                <Day key={day} day={day} events={transformedEvents[day] || []} />
            ))}
        </div>
    );
};

export default Scheduler;
