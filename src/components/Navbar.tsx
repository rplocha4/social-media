import { AiFillHome } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store/store';
import { FiLogOut } from 'react-icons/fi';

function Navbar() {
  const uiSelector = useSelector((state: RootState) => state.ui);
  const darkTheme = uiSelector.darkMode;
  return (
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
      <span
        className={`py-2 flex items-center justify-center gap-2 text-3xl font-bold rounded-xl ${
          darkTheme ? 'darkHover' : 'lightHover'
        }
          bg-slate-40`}
        onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user_id');
          window.location.reload();
        }}
      >
        <FiLogOut className="" />
        <p>Logout</p>
      </span>
    </div>
  );
}

export default Navbar;
