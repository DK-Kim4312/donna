import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { DELETE_EVENT, PUSH_EVENT, UPDATE_EVENT } from "../context/ContextProvider";
import dayjs from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import HoverRating from "../styles/objects/HoverRating";

import SwitchCheckbox from "../styles/objects/SwitchCheckbox";

export default function EventModal() {
  console.log("EventModal", "render");
  const { daySelected, selectedEvent, setShowEventModal, dispatchCalEvent } = useContext(GlobalContext);

  const [title, setTitle] = useState(
    selectedEvent ? selectedEvent.title : ""
  );
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );

  const [startDate, setStartDate] = useState(selectedEvent ? selectedEvent.startDate : daySelected ? daySelected.format("YYYY-MM-DDTHH:mm") : "");
  const [endDate, setEndDate] = useState(selectedEvent ? selectedEvent.endDate : daySelected ? daySelected.add(1, 'hour').format("YYYY-MM-DDTHH:mm") : "");
  const [allDay, setAllDay] = useState(selectedEvent ? selectedEvent.allDay : false);
  const [flexible, setFlexible] = useState(selectedEvent ? selectedEvent.flexible : false);
  const [repeat, setRepeat] = useState(selectedEvent ? selectedEvent.repeat : false);
  const [priority, setPriority] = useState(selectedEvent ? selectedEvent.priority : 3);

  function handlePriorityChange(newPriority) {
    setPriority(newPriority);
  }

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
      <form className="bg-white rounded-lg shadow-2xl w-[500px]">
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
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-1 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-[#52ab98]"
              onChange={(e) => setTitle(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="startDate"
                value={dayjs(startDate)}
                className=" w-full focus:border-[#52ab98]"
                onChange={(newDate) => setStartDate(newDate)}
              />
              <DateTimePicker
                label="endDate"
                value={dayjs(endDate)}
                className="w-full focus:border-[#52ab98]"
                onChange={(newDate) => setEndDate(newDate)}
              />
            </LocalizationProvider>

            <SwitchCheckbox
              label="All Day"
              checked={allDay}
              onChange={(e) => setAllDay(e.target.checked)}
            />
            <SwitchCheckbox
              label="Flexible"
              checked={flexible}
              onChange={(e) => setFlexible(e.target.checked)}
            />
            <SwitchCheckbox
              label="Repeat"
              checked={repeat}
              onChange={(e) => setRepeat(e.target.checked)}
            />
            <div className="inline-flex">
              <HoverRating
                label="Priority Level"
                level={priority}
                onChange={handlePriorityChange}
              />
            </div>

            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="pt-1 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-[#52ab98]"
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
