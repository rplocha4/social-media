import './App.css';
import { useState } from 'react';
import ThemeToggler from './components/ThemeToggler/ThemeToggler';
import Posts from './components/UserPost/Posts';
import { Outlet } from 'react-router-dom';
function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  return (
    <div className={`${darkTheme ? 'dark' : 'light'} min-h-screen min-w-full`}>
      <ThemeToggler
        onToggle={() => setDarkTheme((prev) => !prev)}
        darkTheme={darkTheme}
      />
      <div className="flex justify-center items-center w-full h-screen ">
        <div className="w-1/4 h-full px-2"></div>
        <div className="flex flex-col w-2/4 min-h-full border-x border-gray-800">
          {/* <div className="w-full flex justify-center items-center p-2">
            Tweet
          </div> */}
          <Outlet />
        </div>
        <div className="w-1/4  h-full px-2"></div>
      </div>
    </div>
  );
}

export default App;
