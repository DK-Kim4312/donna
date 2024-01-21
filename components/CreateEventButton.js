import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);

  function createEvent() {
    setShowEventModal(true);
  }

  return (
    <button
      onClick={() => createEvent()}
      className="relative bg-[#52ab98] w-[138.65px] h-[38px] shrink-0 p-3 text-center rounded-md flex items-center shadow-md hover:bg-[#3c8d72] "
    >
      <p className="text-white text-xs grow">
        Create Event
        </p>
    </button>
  );
}
