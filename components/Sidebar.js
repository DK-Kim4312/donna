import React from "react";
import ChatView from "./ChatView";
import MiniCalendar from "./MiniCalendar";
import ProfileTab from "./ProfileTab";
import CreateEventButton from "./CreateEventButton";
import GenerateScheduleButton from "./GenerateScheduleButton";
export default function Sidebar() {
  return (
    <aside className="bg-teal-600 bg-opacity-50 relative flex flex-col w-[360px] shrink-0">
      <ProfileTab />
      <MiniCalendar />
      <div className="flex flex-row items-center justify-center">
        <CreateEventButton />
        <GenerateScheduleButton />
      </div>

      <ChatView />
    </aside>
  );
}
