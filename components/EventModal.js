import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { DELETE_EVENT, PUSH_EVENT, UPDATE_EVENT } from "../context/ContextProvider";

export default function EventModal() {
  console.log("EventModal", "render");
  const { daySelected, selectedEvent, setShowEventModal, dispatchCalEvent } = useContext(GlobalContext);
  
  const [title, setTitle] = useState(
    selectedEvent ? selectedEvent.title : ""
  );
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );

  const [day, setDay] = useState(selectedEvent ? selectedEvent.day : daySelected ? daySelected.format("YYYY-MM-DD") : "");

  const [startTime, setStartTime] = useState(
    selectedEvent ? selectedEvent.startTime : ""
  );

  const [endTime, setEndTime] = useState(
    selectedEvent ? selectedEvent.endTime : ""
  );

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: UPDATE_EVENT, payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: PUSH_EVENT, payload: calendarEvent });
    }

    setShowEventModal(false);
  }
  return (
    <div className="h-screen w-[100%] fixed left-0 top-0 flex justify-center items-center z-50">
      <form className="bg-white rounded-lg shadow-2xl w-[350px]">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            Event Menu
          </span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: DELETE_EVENT,
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
            <input
              type="date"
              name="date"
              value={day}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDay(e.target.value)}
            />

            <input
              type="time"
              name="startTime"
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setStartTime(e.target.value)}
            />
            <input
              type="time"
              name="endTime"
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setEndTime(e.target.value)}
            />
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-[#52ab98] hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
