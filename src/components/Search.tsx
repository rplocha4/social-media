import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useLazySearchUsersQuery } from '../store/features/serverApi';
import { Link } from 'react-router-dom';

function Search() {
  const [focus, setFocus] = useState(false);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const uiSelector = useSelector((state: RootState) => state.ui);
  const darkTheme = uiSelector.darkMode;
  const [getResults] = useLazySearchUsersQuery();

  useEffect(() => {
    if (search.length > 0) {
      getResults(search).then((res) => {
        setResults(res.data.data);
      });
    }
  }, [getResults, search]);

  return (
    <div className=" p-2 flex items-center fixed flex-col">
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
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        />
      </span>

      {search && results.length > 0 && (
        <div className="flex flex-col w-full h-80 overflow-y-scroll">
          {results.map((user: any) => {
            return (
              <Link
                to={`/profile/${user.username}`}
                key={user.user_id}
                className="flex gap-1 items-center darkHover p-2"
                onClick={() => {
                  setSearch('');
                  setResults([]);
                }}
              >
                <img
                  className="rounded-full"
                  src={
                    user.avatar ||
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQP7ARHenfnGXcxCIhmDxObHocM8FPbjyaBg&usqp=CAU'
                  }
                  alt="user profile"
                  style={{ height: '50px', width: '50px' }}
                />
                <p>{user.username}</p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Search;
