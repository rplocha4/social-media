import './App.css';
import ThemeToggler from './components/ThemeToggler/ThemeToggler';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification, toggleDarkMode } from './store/uiSlice';
import Search from './components/Search';
import { RootState } from './store/store';
import { useEffect } from 'react';
import { login } from './store/userSlice';
import { socket } from './socket';
import useNotification from './hooks/useNotification';
function App() {
  const dispatch = useDispatch();
  const uiSelector = useSelector((state: RootState) => state.ui);
  // const userSelector = useSelector((state: RootState) => state.user);
  const darkTheme = uiSelector.darkMode;
  // const { username } = useSelector((state: RootState) => state.user);
  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  const { displayNotification } = useNotification();

  useEffect(() => {
    socket.on('id', ({ id }) => {
      socket.emit('username', { username });
    });
    socket.on('chat message', ({ senderMsg }) => {
      displayNotification(`New message from ${senderMsg}`);
    });
  }, [dispatch, username, displayNotification]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
    const username = localStorage.getItem('username');
    const avatar = localStorage.getItem('avatar');
    const role = localStorage.getItem('role');

    if (localStorage.getItem('token') === null) {
      // dispatch(logout());
      return;
    }
    dispatch(login({ token, user_id, username, avatar, role }));
  }, [dispatch]);

  useEffect(() => {
    // if url is /, redirect to /home
    // if (!username) {
    //   navigate('/login');
    //   return;
    // }
    if (window.location.pathname === '/') navigate('/home');
  }, [navigate]);
  if (!username) {
    return <Navigate to="/login" />;
  }

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
        <div className="w-2/6 h-full self-start ">
          <Search
            onConfirm={(data) => {
              const { username } = data as { username: string };
              navigate(`/profile/${username}`);
            }}
          />
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
      {uiSelector.showNotification && (
        <div className=" fixed  right-10 top-10 rounded-xl px-5 py-2 ease-linear bg-blue-800 ">
          <p className="text-center">{uiSelector.notificationMessage}</p>
        </div>
      )}
    </div>
  );
}

export default App;
