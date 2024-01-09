import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import Day from "./Day";

export default function Month({ month }) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const { daySelected } = useContext(GlobalContext);
  const [monthStartDate, setStartDate] = useState(getMonthStartDate(daySelected));

  useEffect(() => {
    setStartDate(getMonthStartDate(daySelected));
  }, [daySelected]);

  function getMonthStartDate(date) {
    return date.clone().startOf("month");
  }

  var lengthOfMonth = daySelected.daysInMonth();

  const calendarDays = [];

  for (let i = 0; i < lengthOfMonth; i++) {
    const day = daySelected.clone().startOf("month").add(i, "days");
    calendarDays.push(day);
  }

  return (
    <div className="flex-1">
      <div className="flex-1 grid grid-cols-7 grid-rows-1">
        {daysOfWeek.map((dayOfWeek) => (
          <div key={dayOfWeek} className="text-center font-bold">
            {dayOfWeek}
          </div>
        ))}
      </div>
      <div className="flex-1 bottom-0 grid grid-cols-7 grid-rows-5">
        {month.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <Day day={day} key={idx} rowIdx={i} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
