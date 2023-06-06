import React from 'react';
import { useGetUsersQuery } from '../../store/features/serverApi';
import Loading from '../UI/Loading';

function UserList() {
  const { data, isLoading, refetch } = useGetUsersQuery('');
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      {data?.data?.map((user) => {
        return <div key={user.id}>{user.username}</div>;
      })}
    </div>
  );
}

export default UserList;
