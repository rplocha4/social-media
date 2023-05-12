import './App.css';
import ThemeToggler from './components/ThemeToggler/ThemeToggler';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from './store/uiSlice';
import Search from './components/Search';
import { RootState } from './store/store';
import { useEffect } from 'react';
import { login, logout } from './store/userSlice';
function App() {
  const dispatch = useDispatch();
  const uiSelector = useSelector((state: RootState) => state.ui);
  // const userSelector = useSelector((state: RootState) => state.user);
  const darkTheme = uiSelector.darkMode;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
    if (localStorage.getItem('token') === null) {
      dispatch(logout());
      return;
    }
    dispatch(login({ token, user_id }));
  }, []);

  useEffect(() => {
    // if url is /, redirect to /home
    if (window.location.pathname === '/') navigate('/home');
  }, [navigate]);

  return (
    <div className={`${darkTheme ? 'dark' : 'light'} min-h-screen w-full`}>
      <ThemeToggler onToggle={() => dispatch(toggleDarkMode())} />
      <div className="flex justify-center items-center w-full  ">
        <div className="self-start w-1/6 h-full px-2">
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
        {uiSelector.showInfo && (
          <div
            className=" fixed bottom-10 rounded-xl px-5 py-2 ease-linear "
            style={{ backgroundColor: uiSelector.color }}
          >
            <p className="text-center">{uiSelector.infoMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
