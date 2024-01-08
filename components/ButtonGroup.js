// components/ButtonGroup.js

import { useContext, useState } from 'react';
import styles from '../styles/ButtonGroup.module.css';
import GlobalContext from '../context/GlobalContext';

const ButtonGroup = () => {
  const {calendarTypeSelected, setCalendarTypeSelected} = useContext(GlobalContext);

  const handleButtonClick = (buttonIndex) => {
    setCalendarTypeSelected(buttonIndex);
  };

  return (
    <div className={styles.buttonGroup}>
      {["Day", "Week", "Month", "Year"].map((index) => (
        <button
          key={index}
          className={`${styles.button} ${calendarTypeSelected === index ? styles.selected : ''
            }`}
          onClick={() => handleButtonClick(index)}
        >
          {index}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
