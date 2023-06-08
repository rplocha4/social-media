import { useState, useReducer, useMemo } from 'react';
import { useGetUsersQuery } from '../../store/features/serverApi';
import Loading from '../UI/Loading';
import { BsArrowDownShort, BsArrowUpShort } from 'react-icons/bs';

const filterReducer = (
  state: { nameFilter: string; emailFilter: string },
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case 'name':
      return { ...state, nameFilter: action.payload.toLowerCase() };
    case 'email':
      return { ...state, emailFilter: action.payload.toLowerCase() };
    default:
      return state;
  }
};

function UserList() {
  const { data, isLoading } = useGetUsersQuery('');
  const [filters, dispatch] = useReducer(filterReducer, {
    nameFilter: '',
    emailFilter: '',
  });

  const [asc, setAsc] = useState(true);
  const [sort, setSort] = useState('username');
  const filteredUsers = useMemo(() => {
    return data?.data?.filter((user: { username: string; email: string }) => {
      return (
        user.username.toLowerCase().includes(filters.nameFilter) &&
        user.email.toLowerCase().includes(filters.emailFilter)
      );
    });
  }, [data, filters.nameFilter, filters.emailFilter]);

  const sortedUsers = useMemo(() => {
    if (!filteredUsers) return;
    return filteredUsers.sort(
      (
        a: {
          username: string;
          email: string;
        },
        b: {
          username: string;
          email: string;
        }
      ) => {
        if (sort === 'username') {
          if (asc) {
            return a.username.localeCompare(b.username);
          } else {
            return b.username.localeCompare(a.username);
          }
        } else if (sort === 'email') {
          if (asc) {
            return a.email.localeCompare(b.email);
          } else {
            return b.email.localeCompare(a.email);
          }
        }
      }
    );
  }, [filteredUsers, asc, sort]);

  if (isLoading) {
    return <Loading />;
  }

  // console.log(data);

  return (
    <div
      className="
      flex h-full w-full justify-center items-center flex-col "
    >
      <h1
        className="
      text-4xl font-bold"
      >
        Users
      </h1>
      <table className="w-full text-center border border-slate-600 rounded-md shadow-md overflow-hidden border-collapse">
        <thead className="w-full">
          <tr className="w-full">
            <th
              className="border border-slate-600 w-2/6"
              onClick={() => {
                setSort('username');
                setAsc(!asc);
              }}
            >
              <p className="flex items-center justify-center gap-1 cursor-pointer">
                username
                {
                  // add arrow icon
                  sort === 'username' &&
                    (asc ? (
                      <BsArrowUpShort className="text-green-500 text-xl font-bold" />
                    ) : (
                      <BsArrowDownShort className="text-red-500 text-xl font-bold" />
                    ))
                }
              </p>
            </th>
            <th
              className="border border-slate-600  w-2/6"
              onClick={() => {
                setSort('email');
                setAsc(!asc);
              }}
            >
              <p className="flex items-center justify-center gap-1 cursor-pointer">
                email
                {sort === 'email' &&
                  (asc ? (
                    <BsArrowUpShort className="text-green-500 text-xl font-bold" />
                  ) : (
                    <BsArrowDownShort className="text-red-500 text-xl font-bold" />
                  ))}
              </p>
            </th>

            <th
              className="
            border border-slate-600  w-2/6"
              colSpan={3}
            >
              actions
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="border border-slate-700 ">
              <input
                className="w-full h-full bg-transparent outline-none text-center"
                type="text"
                placeholder="Seach by name"
                value={filters.nameFilter}
                onChange={(e) =>
                  dispatch({ type: 'name', payload: e.target.value })
                }
              />
            </td>
            <td className="border border-slate-700 ">
              <input
                className="w-full h-full bg-transparent outline-none text-center"
                type="text"
                placeholder="Seach by email"
                value={filters.emailFilter}
                onChange={(e) =>
                  dispatch({ type: 'email', payload: e.target.value })
                }
              />
            </td>
          </tr>
          {sortedUsers.map(
            (user: { user_id: string; username: string; email: string }) => (
              <tr key={user.user_id}>
                <td className="border border-slate-700 ">{user.username}</td>
                <td className="border border-slate-700 ">{user.email}</td>
                <td className="border border-slate-700 ">
                  <button
                    className="
                  bg-slate-700 text-white rounded-md px-2 py-1 shadow-md hover:bg-slate-600 transition duration-300 ease-in-out "
                  >
                    info
                  </button>
                </td>
                <td className="border border-slate-700 ">
                  <button
                    className="
                  bg-blue-700 text-white rounded-md px-2 py-1 shadow-md hover:bg-blue-600 transition duration-300 ease-in-out 
                  "
                  >
                    edit
                  </button>
                </td>
                <td className="border border-slate-700 ">
                  <button
                    className="
                  bg-red-700 text-white rounded-md px-2 py-1 shadow-md hover:bg-red-600 transition duration-300 ease-in-out
                  "
                  >
                    delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
