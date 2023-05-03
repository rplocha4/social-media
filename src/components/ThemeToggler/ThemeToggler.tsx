import React from 'react';
import classes from './ThemeToggler.module.css';
const ThemeToggler: React.FC<{ onToggle: () => void; darkTheme: boolean }> = ({
  onToggle,
  darkTheme,
}) => {
  return (
    <div className={`${classes.toggleSwitch}`}>
      <label>
        <input type="checkbox" onClick={() => onToggle()} checked={darkTheme} />
        <span className={`${classes.slider}`}></span>
      </label>
    </div>
  );
};

export default ThemeToggler;
