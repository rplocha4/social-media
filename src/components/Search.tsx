import { useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useLazySearchUsersQuery } from '../store/features/serverApi';
import Loading from './UI/Loading';
import useClickOutside from '../hooks/useClickOutside';
import { defaultAvatar } from '../types/types';
import { useTheme } from './context/ThemeProvider';
import useDebounce from '../hooks/useDebounce';

function Search({
  onConfirm,
}: {
  onConfirm: (
    value: string | { username: string; avatar: string; id: string }
  ) => void;
}) {
  const [focus, setFocus] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce({ value: search, delay: 200 });
  const { theme } = useTheme();

  const [getResults] = useLazySearchUsersQuery();
  const ref = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useClickOutside(ref);

  // const getSearchResults = (value: string) => {
  //   if (value.trim().length === 0) {
  //     setResults([]);
  //     return;
  //   }
  //   setLoading(true);
  //   getResults(value.trim()).then((res) => {
  //     setResults(res?.data?.data);
  //     setLoading(false);
  //   });
  // };

  useEffect(() => {
    if (debouncedSearch.trim().length === 0) {
      setResults([]);
      return;
    }
    setLoading(true);
    getResults(debouncedSearch.trim()).then((res) => {
      setResults(res?.data?.data);
      setLoading(false);
    });
  }, [debouncedSearch, getResults]);

  return (
    <div className={`p-2 flex flex-col relative`}>
      <span
        className={`flex items-center gap-2 ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-zinc-200'
        } w-full rounded-2xl p-3 border ${
          focus
            ? 'border-blue-500'
            : theme === 'dark'
            ? 'border-gray-900'
            : 'border-zinc-200'
        }`}
      >
        <AiOutlineSearch className={`text-2xl ${focus && 'text-blue-500'}`} />
        <input
          type="text"
          placeholder="Search"
          className=" bg-inherit outline-none w-full"
          onFocus={() => {
            setFocus(true);
            setOpen(true);
          }}
          onBlur={() => {
            setFocus(false);
            // setOpen(false);
          }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          // value={search}
        />
      </span>
      {open && (
        <div
          className="flex flex-col p-2 w-60 h-80 overflow-y-scroll absolute top-20 bg-slate-900 rounded-xl"
          ref={ref}
        >
          {loading ? (
            <Loading />
          ) : results.length > 0 ? (
            results.map(
              (user: { user_id: string; username: string; avatar: string }) => {
                return (
                  <div
                    key={user.user_id}
                    className="flex gap-1 items-center darkHover p-2 hover:cursor-pointer"
                    onClick={() => {
                      onConfirm({
                        username: user.username,
                        id: user.user_id,
                        avatar: user.avatar || defaultAvatar,
                      });
                      setResults([]);
                      setOpen(false);
                    }}
                  >
                    <img
                      className="rounded-full"
                      src={user.avatar || defaultAvatar}
                      alt="user profile"
                      style={{ height: '50px', width: '50px' }}
                    />
                    <p>{user.username}</p>
                  </div>
                );
              }
            )
          ) : (
            <p className="text-center">No results found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
