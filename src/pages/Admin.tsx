import { Navigate } from 'react-router';
import { useGetUsersQuery } from '../store/features/serverApi';
import UserList from '../components/admin/UserList';

function Admin() {
  const role = localStorage.getItem('role');

  if (role !== 'admin') {
    console.log('asds');
    return <Navigate to="/home" />;
  }

  return (
    <div>
      <UserList />
    </div>
  );
}

export default Admin;