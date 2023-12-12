"use client";
import React from 'react';
import styles from '../styles/Layout.module.css';
import ChatView from './ChatView';
import CalendarView from './CalendarView';

const Layout = () => {
    return (
        <div className={styles.layout}>
            <div className={styles.chatcontainer}>
                <ChatView />
            </div>
            <div className={styles.calendarcontainer}>
                <CalendarView />
            </div>


        </div>
    );
};

export default Layout;
