'use client';
import React, { useContext } from "react";
import ChatView from "../../components/ChatView";
import ProfileTab from "../../components/ProfileTab";
import CreateEventButton from "../../components/CreateEventButton";
import GenerateScheduleButton from "../../components/GenerateScheduleButton";
import Calendar from "../../components/Calendar";
import { CalendarContext } from "../../context/CalendarContext";
import CreateEventModal from "../../components/CreateEventModal";
import EditEventModal from "../../components/EditEventModal";


export default function Main() {
  const { user, showAddModal, showEditModal } = useContext(CalendarContext);


  return (
    <React.Fragment>
      {showAddModal && <CreateEventModal />}
      {showEditModal && <EditEventModal />}
      <div className="flex flex-row min-w-[100vw] min-h-[100vh] w-[100vw] h-[100vh] max-w-[100vw] max-h-[100vh] overflow-hidden">
        {/*Sidebar*/}
        <aside className="relative flex flex-col w-[360px] shrink-0 pl-[25px] pt-[36px]">
          <div className="relative h-[90px] w-[360px] shrink-0">
            <ProfileTab
              user={user} />
          </div>
          <div className="relative flex flex-row items-center justify-center">
            <CreateEventButton />
            <GenerateScheduleButton />
          </div>
          <div className="bottom-[5px] w-[100%] ml-[5px] mr-[5px] mt-[150px]">
            <ChatView />
          </div>
        </aside>
        <Calendar />

      </div>

    </React.Fragment>

  );
}