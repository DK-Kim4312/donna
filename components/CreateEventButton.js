import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="bg-[#52ab98] w-[138.65px] h-[38px] shrink-0 p-3 text-center rounded-md flex items-center shadow-md hover:shadow-2xl "
    >
      <p className="text-white text-xs grow">
        Create Event
        </p>
    </button>
  );
}
