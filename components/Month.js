import React from "react";
import Day from "./Day";

export default function Month({ month }) {
  return (
    <div className="flex-grow relative grid grid-cols-auto-fill-col grid-rows-auto-fill-row">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
