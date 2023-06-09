import { useState } from 'react';
import Loading from './UI/Loading';
import Modal from './UI/Modal';
import { useNavigate } from 'react-router-dom';
import { defaultAvatar } from '../types/types';
import ModalUserList from './UI/ModalUserList';

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
        <ModalUserList
          type={type}
          data={data}
          onClose={() => {
            setInfoOpen(false);
          }}
        />
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
