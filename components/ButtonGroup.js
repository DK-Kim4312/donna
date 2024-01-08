// components/ButtonGroup.js

import { useState } from 'react';
import styles from '../styles/ButtonGroup.module.css';

const ButtonGroup = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonIndex) => {
    setSelectedButton(buttonIndex);
  };

  return (
    <div className={styles.buttonGroup}>
      {["Day", "Week", "Month", "Year"].map((index) => (
        <button
          key={index}
          className={`${styles.button} ${
            selectedButton === index ? styles.selected : ''
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
