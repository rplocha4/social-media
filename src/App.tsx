import './App.css';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import Search from './components/Search';
import { RootState } from './store/store';
import { useEffect } from 'react';
import { login } from './store/userSlice';
import { socket } from './socket';
import useNotification from './hooks/useNotification';
import { useTheme } from './components/context/ThemeProvider';
import { useShowInfo } from './components/context/ShowInfoProvider';
function App() {
  const dispatch = useDispatch();
  const uiSelector = useSelector((state: RootState) => state.ui);
  const { theme } = useTheme();
  const { showInfo, infoMessage, color } = useShowInfo();
  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  const { displayNotification } = useNotification();
  const notificationSettings = JSON.parse(
    localStorage.getItem(`notificationSettings-${username}`) || '{}'
  );

  useEffect(() => {
    socket.emit('username', { username });
    socket.on('chat message', ({ senderMsg }) => {
      displayNotification(`New message from ${senderMsg}`);
    });
    socket.on('like', ({ liker }) => {
      notificationSettings.likes &&
        displayNotification(`${liker} liked your post`);
    });
    socket.on('comment', ({ commenter }) => {
      notificationSettings.comments &&
        displayNotification(`${commenter} commented on your post`);
    });
    socket.on('follow', ({ follower }) => {
      notificationSettings.follows &&
        displayNotification(`${follower} followed you`);
    });
    socket.on('mention', ({ mentioner }) => {
      notificationSettings.mentions &&
        displayNotification(`${mentioner} mentioned you in a post`);
    });

    return () => {
      socket.off('chat message');
      socket.off('like');
      socket.off('comment');
      socket.off('follow');
      socket.off('mention');
    };
  }, [dispatch, username, displayNotification, notificationSettings]);

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
    <div className={`${theme} min-h-screen w-full`}>
      <div className="flex justify-center w-full  ">
        <div className="self-start w-1/6 sticky top-0 h-full ">
          <Navbar />
        </div>
        <div className="flex flex-col w-3/6 min-h-full border border-gray-800 grow ">
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
        {showInfo && (
          <div
            className=" fixed bottom-10 rounded-xl px-5 py-2 ease-linear "
            style={{ backgroundColor: color }}
          >
            <p className="text-center">{infoMessage}</p>
          </div>
        )}
      </div>
      {uiSelector.showNotification && (
        <div className=" fixed  right-10 top-10 rounded-xl px-5 py-2 ease-linear  bg-blue-800 ">
          <p className="text-center">{uiSelector.notificationMessage}</p>
        </div>
      )}
    </div>
  );
}

export default App;
