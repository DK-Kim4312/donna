import React from "react";
import ChatView from "./ChatView";
import MiniCalendar from "./MiniCalendar";
import ProfileTab from "./ProfileTab";

export default function Sidebar() {
  return (
    <aside className="bg-[#52ab9833] border-none inline-block h-screen flex flex-col pl-[1.5vw] pr-[0.763vw] pb-[2.41vh] pt-[2.31vh]">
        <ProfileTab />
        <MiniCalendar />
        <ChatView />
    </aside>
  );
}
