import { Navigate } from 'react-router';
import UserList from '../components/admin/UserList';
import { useShowInfo } from '../components/context/ShowInfoProvider';
import { useState } from 'react';
import Reports from '../components/admin/Reports';

function Admin() {
  const role = localStorage.getItem('role');
  const { showInfo, infoMessage, color } = useShowInfo();
  const [filter, setFilter] = useState('users');

  if (role !== 'admin') {
    return <Navigate to="/home" />;
  }

  return (
    <div>
      <div className="flex justify-center gap-10 p-5">
        <button
          className={`${
            filter === 'users' ? 'bg-blue-400' : 'bg-blue-600'
          } hover:bg-blue-400 text-white font-bold py-2 px-4 rounded`}
          onClick={() => setFilter('users')}
        >
          Users
        </button>
        <button
          className={`${
            filter === 'reports' ? 'bg-blue-400' : 'bg-blue-600'
          } hover:bg-blue-400 text-white font-bold py-2 px-4 rounded`}
          onClick={() => setFilter('reports')}
        >
          Reports
        </button>
      </div>

      {filter === 'users' ? <UserList /> : <Reports />}

      {showInfo && (
        <div
          className=" fixed bottom-10 right-1/2 rounded-xl px-5 py-2 ease-linear "
          style={{ backgroundColor: color }}
        >
          <p className="text-center">{infoMessage}</p>
        </div>
      )}
    </div>
  );
}

export default Admin;
