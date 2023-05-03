import './App.css';
import { useState } from 'react';
import ThemeToggler from './components/ThemeToggler/ThemeToggler';
function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  return (
    <div className={`${darkTheme ? 'dark' : 'light'} min-h-screen w-full`}>
      <ThemeToggler
        onToggle={() => setDarkTheme((prev) => !prev)}
        darkTheme={darkTheme}
      />
    </div>
  );
}

export default App;
