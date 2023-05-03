import './App.css';
import { useState } from 'react';
import ThemeToggler from './components/ThemeToggler/ThemeToggler';
import Post from './components/UserPost/Post';
function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  return (
    <div className={`${darkTheme ? 'dark' : 'light'} min-h-screen min-w-full`}>
      <ThemeToggler
        onToggle={() => setDarkTheme((prev) => !prev)}
        darkTheme={darkTheme}
      />
      <div className="flex flex-col justify-center items-center ">
        <Post />
      </div>
    </div>
  );
}

export default App;
