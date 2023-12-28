import React from "react";
import ChatView from "./ChatView";
import MiniCalendar from "./MiniCalendar";
import ProfileTab from "./ProfileTab";
import CreateEventButton from "./CreateEventButton";
import GenerateScheduleButton from "./GenerateScheduleButton";

export default function Sidebar() {
  return (
    <aside className="bg-[#52ab9833] border-none inline-block h-screen flex flex-col pl-[1.5vw] pr-[0.763vw] pb-[2.41vh] pt-[2.31vh]">
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
