import React from 'react';
import { useGetUsersQuery } from '../../store/features/serverApi';
import Loading from '../UI/Loading';

function UserList() {
  const { data, isLoading, refetch } = useGetUsersQuery('');
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
        <thead>
          <tr>
            <th className="border border-slate-600">username</th>
            <th className="border border-slate-600">email</th>
          </tr>
        </thead>

        <tbody>
          {data?.data?.map(
            (user: { id: string; username: string; email: string }) => (
              <tr key={user.id}>
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
