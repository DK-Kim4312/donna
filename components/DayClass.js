import {useState, useContext, useEffect} from 'react'
import dayjs from 'dayjs'
import GlobalContext from '../context/GlobalContext'

const DayClass = ( { date } ) => {
    const date = date;
    const { serverEvents } = useContext(GlobalContext);
    const [dayEvents, setDayEvents] = useState([]);

    function addEvents() {
        // Add Event Actions

        setDayEvents()
    }
    

    

}