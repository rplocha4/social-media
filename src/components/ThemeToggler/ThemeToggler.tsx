import classes from './ThemeToggler.module.css';
import { useTheme } from '../context/ThemeProvider';
const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`${classes.toggleSwitch}`}>
      <label>
        <input
          type="checkbox"
          checked={theme === 'dark' ? true : false}
          onChange={toggleTheme}
        />
        <span className={`${classes.slider}`}></span>
      </label>
    </div>
  );
};

export default ThemeToggler;
