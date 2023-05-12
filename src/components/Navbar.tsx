import { AiFillHome } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store/store';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { hideInfo, showInfo } from '../store/uiSlice';
import { logout } from '../store/userSlice';

function Navbar() {
  const uiSelector = useSelector((state: RootState) => state.ui);
  const userSelector = useSelector((state: RootState) => state.user);
  const darkTheme = uiSelector.darkMode;
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col justify-between h-screen fixed mt-10">
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
      </div>

      {userSelector.user_id !== null ? (
        <span
          className={`p-2 flex items-center justify-center gap-2 text-3xl font-bold rounded-xl mb-20 cursor-pointer ${
            darkTheme ? 'darkHover' : 'lightHover'
          }
          bg-slate-40`}
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            // dispatch(logout());
            window.location.reload();

            dispatch(
              showInfo({ message: 'Successfully logged out', color: 'green' })
            );
            setTimeout(() => {
              dispatch(hideInfo());
            }, 2000);
          }}
        >
          <FiLogOut className="" />
          <p>Logout</p>
        </span>
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
  );
}

export default Navbar;
