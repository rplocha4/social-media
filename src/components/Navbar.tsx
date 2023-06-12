import { AiFillHome } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { logout } from '../store/userSlice';
import { BsCalendarEvent, BsFillChatDotsFill } from 'react-icons/bs';
import { useLayoutEffect, useState } from 'react';
import { MdGroups } from 'react-icons/md';
import { useTheme } from './context/ThemeProvider';
import { useShowInfo } from './context/ShowInfoProvider';
import ThemeToggler from './ThemeToggler/ThemeToggler';
import { RiAdminFill } from 'react-icons/ri';

function Navbar() {
  const { avatar } = useSelector((state: RootState) => state.user);
  const username = localStorage.getItem('username');
  const { theme } = useTheme();
  const { displayInfo } = useShowInfo();
  const isAdmin = localStorage.getItem('role') === 'admin';

  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    // updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col justify-between h-screen  overflow-hidden w-full ">
      <div className="flex flex-col gap-3 items-center justify-center w-full">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `${isActive ? 'text-4xl ' : 'text-3xl text-gray-400'}`
          }
        >
          <span
            className={`p-4 flex items-center justify-center gap-2  font-bold rounded-xl ${
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
            `${isActive ? 'text-4xl ' : 'text-3xl text-gray-400'}`
          }
        >
          <span
            className={`p-4 flex items-center justify-center gap-2  font-bold rounded-xl ${
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
            `${isActive ? 'text-4xl ' : 'text-3xl text-gray-400'}`
          }
        >
          <span
            className={`p-4 flex items-center justify-center gap-2  font-bold rounded-xl ${
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
            `${isActive ? 'text-4xl ' : 'text-3xl text-gray-400'}`
          }
        >
          <span
            className={`p-4 flex items-center justify-center gap-2  font-bold rounded-xl ${
              theme === 'dark' ? 'darkHover' : 'lightHover'
            } 
          bg-slate-40`}
          >
            <MdGroups className="" />

            {width > 1000 && <p>Groups</p>}
          </span>
        </NavLink>
        {width > 1000 && (
          <span
            className={`p-4 text-3xl flex flex-col items-center text-gray-400 justify-center gap-2  font-bold rounded-xl bg-slate-40`}
          >
            <p className=" text-center">Toggle theme</p>
            <ThemeToggler />
          </span>
        )}
      </div>
      {isAdmin && (
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `${isActive ? 'text-4xl ' : 'text-3xl text-gray-400'}`
          }
        >
          <span
            className={`p-4 flex items-center justify-center gap-2  font-bold rounded-xl cursor-pointer ${
              theme === 'dark' ? 'darkHover' : 'lightHover'
            }
                bg-slate-40`}
          >
            <RiAdminFill />
            {width > 1000 && <p>Admin</p>}
          </span>
        </NavLink>
      )}

      {username !== null ? (
        <div className="flex flex-col items pb-5 gap-3">
          <NavLink
            to={`/profile/${username}`}
            className={({ isActive }) =>
              `${isActive ? 'text-4xl ' : 'text-3xl text-gray-400'}`
            }
          >
            <span
              className={`p-4 flex items-center justify-center gap-2  font-bold rounded-xl cursor-pointer ${
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

          <span
            className={`p-4 flex items-center justify-center gap-2 text-3xl font-bold rounded-xl cursor-pointer ${
              theme === 'dark' ? 'darkHover' : 'lightHover'
            }
          bg-slate-40`}
            onClick={() => {
              dispatch(logout());
              navigate('/login');
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
            className={`p-4 flex items-center justify-center gap-2 text-3xl font-bold rounded-xl pb-5 cursor-pointer ${
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
  );
}

export default Navbar;
