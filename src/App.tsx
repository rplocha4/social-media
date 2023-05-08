import './App.css';
import { useState } from 'react';
import ThemeToggler from './components/ThemeToggler/ThemeToggler';
import Posts from './components/UserPost/Posts';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from './store/uiSlice';
import Search from './components/Search';
import { RootState } from './store/store';
function App() {
  const dispatch = useDispatch();
  const uiSelector = useSelector((state: RootState) => state.ui);
  const darkTheme = uiSelector.darkMode;

  return (
    <div className={`${darkTheme ? 'dark' : 'light'} min-h-screen min-w-full`}>
      <ThemeToggler onToggle={() => dispatch(toggleDarkMode())} />
      <div className="flex justify-center items-center w-full  ">
        <div className="self-start pt-20 w-1/6 h-full px-2">
          <Navbar />
        </div>
        <div className="flex flex-col w-3/6 min-h-full border border-gray-800">
          {/* <div className="w-full flex justify-center items-center p-2">
            Tweet
          </div> */}
          <Outlet />
        </div>
        <div className="w-2/6 h-full self-start">
          <Search />
        </div>
      </div>
    </div>
  );
}

export default App;
