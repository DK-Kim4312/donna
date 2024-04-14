import React from "react";
export default function GenerateScheduleButton() {

  function handleClick() {
    alert("Generate Schedule is not implemented yet.");
  }
  return (
    <button
      className="relative bg-[#52ab98] w-[138.65px] h-[38px] shrink-0 p-3 ml-2 rounded-md flex items-center shadow-md hover:bg-[#3c8d72]"
      onClick={handleClick}
    >
      <p className="text-white text-xs grow">
        Generate Schedule
      </p>
    </button>
  );
}
