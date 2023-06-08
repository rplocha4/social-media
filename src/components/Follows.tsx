import { useEffect, useState } from 'react';
import Loading from './UI/Loading';
import Modal from './UI/Modal';
import { Link, useNavigate } from 'react-router-dom';
import { defaultAvatar } from '../types/types';

function Follows({
  type,
  data,
  isLoading,
}: {
  type: string;
  data: {
    user_id: string;
    username: string;
    avatar: string;
  }[];
  isLoading: boolean;
}) {
  const [infoOpen, setInfoOpen] = useState(false);
  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {infoOpen && (
        <Modal
          onClose={() => {
            setInfoOpen(false);
          }}
        >
          <div className="flex flex-col gap-2 min-h-40">
            {data.map(
              (user: { user_id: string; username: string; avatar: string }) => {
                return (
                  <div
                    className="flex items-center gap-2 hover:cursor-pointer hover:underline p-2 hover:bg-slate-900 rounded-md "
                    key={user.user_id}
                    onClick={() => {
                      setInfoOpen(false);
                      navigate(`/profile/${user.username}`);
                    }}
                  >
                    <img
                      src={user.avatar || defaultAvatar}
                      alt="avatar"
                      className="w-20 h-20 rounded-full"
                    />
                    <p className="text-white">{user.username}</p>
                  </div>
                );
              }
            )}
          </div>
        </Modal>
      )}

      <span
        className="flex items-center gap-1 hover:underline hover:cursor-pointer"
        onClick={() => {
          data.length > 0 && setInfoOpen(true);
        }}
      >
        <p className="text-white font-bold">{data.length}</p>
        <p>{type}</p>
      </span>
    </>
  );
}

export default Follows;
