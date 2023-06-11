import { AiFillHome } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { RootState } from '../store/store';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { logout } from '../store/userSlice';
import { BsCalendarEvent, BsFillChatDotsFill } from 'react-icons/bs';
import { useLayoutEffect, useState } from 'react';
import { MdGroups } from 'react-icons/md';
import { useTheme } from './context/ThemeProvider';
import { useShowInfo } from './context/ShowInfoProvider';

function Navbar() {
  const { avatar } = useSelector((state: RootState) => state.user);
  const username = localStorage.getItem('username');
  const { theme } = useTheme();
  const { displayInfo } = useShowInfo();

  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex flex-col justify-between h-screen fixed mt-10 overflow-hidden">
        <div className="flex flex-col gap-3">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `${isActive ? 'text-4xl text-white' : 'text-3xl text-gray-400'}`
            }
          >
            <span
              className={`py-2 flex items-center justify-center gap-2  font-bold rounded-xl ${
                theme === 'dark' ? 'darkHover' : 'lightHover'
              } bg-slate-40 `}
            >
              <AiFillHome className="" />
              {width > 1000 && <p>Home</p>}
            </span>
          </NavLink>
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              `${isActive ? 'text-4xl text-white' : 'text-3xl text-gray-400'}`
            }
          >
            <span
              className={`py-2 flex items-center justify-center gap-2  font-bold rounded-xl ${
                theme === 'dark' ? 'darkHover' : 'lightHover'
              } 
          bg-slate-40`}
            >
              <BsFillChatDotsFill className="" />

              {width > 1000 && <p>Chat</p>}
            </span>
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              `${isActive ? 'text-4xl text-white' : 'text-3xl text-gray-400'}`
            }
          >
            <span
              className={`py-2 flex items-center justify-center gap-2  font-bold rounded-xl ${
                theme === 'dark' ? 'darkHover' : 'lightHover'
              } 
          bg-slate-40`}
            >
              <BsCalendarEvent className="" />

              {width > 1000 && <p>Events</p>}
            </span>
          </NavLink>
          <NavLink
            to="/groups"
            className={({ isActive }) =>
              `${isActive ? 'text-4xl text-white' : 'text-3xl text-gray-400'}`
            }
          >
            <span
              className={`py-2 flex items-center justify-center gap-2  font-bold rounded-xl ${
                theme === 'dark' ? 'darkHover' : 'lightHover'
              } 
          bg-slate-40`}
            >
              <MdGroups className="" />

              {width > 1000 && <p>Groups</p>}
            </span>
          </NavLink>
        </div>

        {username !== null ? (
          <div className="flex flex-col items mb-20 gap-3">
            <NavLink
              to={`/profile/${username}`}
              className={({ isActive }) =>
                `${isActive ? 'text-4xl text-white' : 'text-3xl text-gray-400'}`
              }
            >
              <span
                className={`py-2 flex items-center justify-center gap-2  font-bold rounded-xl cursor-pointer ${
                  theme === 'dark' ? 'darkHover' : 'lightHover'
                }
            bg-slate-40`}
              >
                <img
                  src={avatar}
                  alt=""
                  className="rounded-full"
                  style={{
                    height: '50px',
                    width: '50px',
                  }}
                />
                {width > 1000 && (
                  <p>
                    {username.length > 10
                      ? username.slice(0, 10) + '...'
                      : username}
                  </p>
                )}
              </span>
            </NavLink>
            {/* <div
              className={`p-2 flex items-center justify-center gap-2 text-3xl font-bold rounded-xl cursor-pointer flex-wrap ${
                theme === 'dark' ? 'darkHover' : 'lightHover'
              }
          bg-slate-40`}
              onClick={() => setShowModal(true)}
            >
              <AiOutlinePlusCircle />
              Create a post
            </div> */}
            <span
              className={`p-2 flex items-center justify-center gap-2 text-3xl font-bold rounded-xl cursor-pointer ${
                theme === 'dark' ? 'darkHover' : 'lightHover'
              }
          bg-slate-40`}
              onClick={() => {
                dispatch(logout());
                window.location.reload();
                displayInfo({
                  message: 'Successfully logged out',
                  color: 'green',
                });
              }}
            >
              <FiLogOut className="" />
              {width > 1000 && <p>Logout</p>}
            </span>
          </div>
        ) : (
          <Link to="/login" className="">
            <span
              className={`py-2 flex items-center justify-center gap-2 text-3xl font-bold rounded-xl mb-20 cursor-pointer ${
                theme === 'dark' ? 'darkHover' : 'lightHover'
              }
          bg-slate-40`}
            >
              <FiLogIn className="" />
              {width > 1000 && <p>Login</p>}
            </span>
          </Link>
        )}
      </div>
    </>
  );
}

export default Navbar;
