import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useLazySearchUsersQuery } from '../store/features/serverApi';
import Loading from './UI/Loading';

function Search({
  onConfirm,
}: {
  onConfirm: (
    value: string | { username: string; avatar: string; id: string }
  ) => void;
}) {
  const [focus, setFocus] = useState(false);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const uiSelector = useSelector((state: RootState) => state.ui);
  const [loading, setLoading] = useState(false);
  const darkTheme = uiSelector.darkMode;
  const [getResults] = useLazySearchUsersQuery();

  useEffect(() => {
    if (search.length > 0) {
      setLoading(true);
      getResults(search).then((res) => {
        setResults(res.data.data);
        setLoading(false);
      });
    }
  }, [getResults, search]);

  return (
    <div className={`p-2 flex flex-col relative`}>
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
          className=" bg-inherit outline-none w-full"
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
      {loading ? (
        <Loading />
      ) : (
        search &&
        results.length > 0 && (
          <div className="flex flex-col p-2 w-60 h-80 overflow-y-scroll absolute top-20 bg-slate-900 rounded-xl">
            {results.map((user: any) => {
              return (
                <div
                  key={user.user_id}
                  className="flex gap-1 items-center darkHover p-2 hover:cursor-pointer"
                  onClick={() => {
                    onConfirm({
                      username: user.username,
                      id: user.user_id,
                      avatar:
                        user.avatar ||
                        'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png',
                    });
                    setSearch('');
                    setResults([]);
                  }}
                >
                  <img
                    className="rounded-full"
                    src={
                      user.avatar ||
                      'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
                    }
                    alt="user profile"
                    style={{ height: '50px', width: '50px' }}
                  />
                  <p>{user.username}</p>
                </div>
              );
            })}
          </div>
        )
      )}
    </div>
  );
}

export default Search;
