import { AiFillHome } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store/store';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { hideInfo, showInfo } from '../store/uiSlice';
import { logout } from '../store/userSlice';
import { BsFillChatDotsFill } from 'react-icons/bs';
import Modal from './UI/Modal';

function Navbar() {
  const uiSelector = useSelector((state: RootState) => state.ui);
  const { avatar } = useSelector((state: RootState) => state.user);
  const username = localStorage.getItem('username');
  const darkTheme = uiSelector.darkMode;
  const dispatch = useDispatch();
  // const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex flex-col justify-between h-screen fixed  mt-10 overflow-hidden">
        <div className="flex flex-col gap-3">
          <Link to="/home" className="">
            <span
              className={`py-2 flex items-center justify-center gap-2 text-3xl font-bold rounded-xl ${
                darkTheme ? 'darkHover' : 'lightHover'
              } 
          bg-slate-40`}
            >
              <AiFillHome className="" />
              <p>Home</p>
            </span>
          </Link>
          <Link to="/chat" className="">
            <span
              className={`py-2 flex items-center justify-center gap-2 text-3xl font-bold rounded-xl ${
                darkTheme ? 'darkHover' : 'lightHover'
              } 
          bg-slate-40`}
            >
              <BsFillChatDotsFill className="" />
              <p>Chat</p>
            </span>
          </Link>
        </div>

        {username !== null ? (
          <div className="flex flex-col items mb-20 gap-3">
            <Link to={`/profile/${username}`} className="">
              <span
                className={`py-2 flex items-center justify-center gap-2 text-3xl font-bold rounded-xl cursor-pointer ${
                  darkTheme ? 'darkHover' : 'lightHover'
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
                <p>
                  {username.length > 10
                    ? username.slice(0, 10) + '...'
                    : username}
                </p>
              </span>
            </Link>
            {/* <div
              className={`p-2 flex items-center justify-center gap-2 text-3xl font-bold rounded-xl cursor-pointer flex-wrap ${
                darkTheme ? 'darkHover' : 'lightHover'
              }
          bg-slate-40`}
              onClick={() => setShowModal(true)}
            >
              <AiOutlinePlusCircle />
              Create a post
            </div> */}
            <span
              className={`p-2 flex items-center justify-center gap-2 text-3xl font-bold rounded-xl cursor-pointer ${
                darkTheme ? 'darkHover' : 'lightHover'
              }
          bg-slate-40`}
              onClick={() => {
                dispatch(logout());
                window.location.reload();

                dispatch(
                  showInfo({
                    message: 'Successfully logged out',
                    color: 'green',
                  })
                );
                setTimeout(() => {
                  dispatch(hideInfo());
                }, 2000);
              }}
            >
              <FiLogOut className="" />
              <p>Logout</p>
            </span>
          </div>
        ) : (
          <Link to="/login" className="">
            <span
              className={`py-2 flex items-center justify-center gap-2 text-3xl font-bold rounded-xl mb-20 cursor-pointer ${
                darkTheme ? 'darkHover' : 'lightHover'
              }
          bg-slate-40`}
            >
              <FiLogIn className="" />
              <p>Login</p>
            </span>
          </Link>
        )}
      </div>
    </>
  );
}

export default Navbar;
