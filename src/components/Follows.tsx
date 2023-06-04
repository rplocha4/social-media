import React, { useState } from 'react';
import Loading from './UI/Loading';
import Modal from './UI/Modal';
import { info } from 'sass';

function Follows({
  type,
  data,
  isLoading,
}: {
  type: string;
  data: any;
  isLoading: boolean;
}) {
  const [infoOpen, setInfoOpen] = useState(false);

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
          <div className="flex flex-col gap-2 h-40">
            {data.map((user: any) => {
              return (
                <div className="flex items-center gap-2" key={user.user_id}>
                  <img
                    src={
                      user.avatar ||
                      'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
                    }
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="text-white">{user.username}</p>
                </div>
              );
            })}
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
