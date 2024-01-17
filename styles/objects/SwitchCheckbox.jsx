import React, { useState } from 'react';
import './SwitchCheckbox.scss';

function SwitchCheckbox({ label, checked }) {
  const [isChecked, setIsChecked] = useState(checked);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="checkbox-switch">
        <legend className="legend-left">{label}</legend>
        <input
          type="checkbox"
          id={`checkbox-${label.toLowerCase()}`}
          checked={isChecked}
          onChange={toggleCheckbox}
        />
        <label htmlFor={`checkbox-${label.toLowerCase()}`} title={`Turn ${label} on/off`} className="checkbox-right"></label>
    </div>
  );
}

export default SwitchCheckbox;