import React from "react";
import ChatView from "./ChatView";
import MiniCalendar from "./MiniCalendar";
import ProfileTab from "./ProfileTab";

export default function Sidebar() {
  return (
    <aside className="border w-25vw">
        <ProfileTab />
        <MiniCalendar />
        <ChatView />
    </aside>
  );
}
