import React from 'react';
import classes from './ThemeToggler.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
const ThemeToggler: React.FC<{ onToggle: () => void }> = ({ onToggle }) => {
  const uiSelector = useSelector((state: RootState) => state.ui);
  const darkTheme = uiSelector.darkMode;
  return (
    <div className={`${classes.toggleSwitch}`}>
      <label>
        <input
          type="checkbox"
          checked={darkTheme}
          onChange={() => {
            onToggle();
          }}
        />
        <span className={`${classes.slider}`}></span>
      </label>
    </div>
  );
};

export default ThemeToggler;
