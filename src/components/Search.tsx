import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

function Search() {
  const [focus, setFocus] = useState(false);
  const uiSelector = useSelector((state: RootState) => state.ui);
  const darkTheme = uiSelector.darkMode;
  return (
    <div className=" p-2 flex items-center fixed">
      <span
        className={`flex items-center gap-2 ${
          darkTheme ? 'bg-gray-900' : 'bg-zinc-200'
        } w-full   rounded-2xl p-3 my-2 border ${
          focus
            ? 'border-blue-500'
            : darkTheme
            ? 'border-gray-900'
            : 'border-zinc-200'
        }`}
      >
        <AiOutlineSearch className={`text-2xl ${focus && 'text-blue-500'}`} />
        <input
          type="text"
          placeholder="Search"
          className=" bg-inherit outline-none"
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
        />
      </span>
    </div>
  );
}

export default Search;
