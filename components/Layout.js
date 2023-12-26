"use client";
import React from 'react';
import styles from '../styles/Layout.module.css';
import Sidebar from './Sidebar';
import Calendar from './Calendar';

const Layout = () => {
    return (
        <div className={styles.layout}>
            <div className={styles.sidebar}>
               <Sidebar />
            </div>
            <div className={styles.calendarcontainer}>
                <Calendar />
            </div>
            
        </div>
    );
};

export default Layout;
