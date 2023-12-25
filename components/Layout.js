"use client";
import React from 'react';
import styles from '../styles/Layout.module.css';
import ChatView from './ChatView';
import CalendarView from './CalendarView';
import Calendar from './Calendar';
import DonnaCalendar from './DonnaCalendar';
import MiniCalendar from './MiniCalendar';
import ProfileTab from './ProfileTab';

const Layout = () => {
    return (
        <div className={styles.layout}>
            <div className={styles.sidebar}>
                <ProfileTab />
                <MiniCalendar />
                <ChatView />
            </div>
            <div className={styles.calendarcontainer}>
                {/* <CalendarView /> */}
                {/*<Calendar />*/}
                <DonnaCalendar />
            </div>
        </div>
    );
};

export default Layout;
