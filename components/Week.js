import React from "react";
import Day from "./Day";
export default function Week({ week }) {
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-1">
      {week.map((day, idx) => (
        <Day day={day} key={idx} rowIdx={0} />
      ))}
    </div>
  );
}
