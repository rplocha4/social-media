import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { defaultAvatar } from '../../types/types';

function ModalUserList({
  type,
  data,
  onClose,
}: {
  type: string;
  data: {
    user_id: string;
    username: string;
    avatar: string;
  }[];
  onClose: () => void;
}) {
  const navigate = useNavigate();

  return (
    <Modal
      onClose={() => {
        onClose();
      }}
    >
      <div className="flex flex-col gap-2 min-h-40">
        {
          <p className="text-white font-bold flex justify-center text-2xl">
            {data.length} {type}
          </p>
        }
        {data.map(
          (user: { user_id: string; username: string; avatar: string }) => {
            return (
              <div
                className="flex items-center gap-2 hover:cursor-pointer hover:underline p-2 hover:bg-zinc-800 rounded-md "
                key={user.user_id}
                onClick={() => {
                  onClose();
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
  );
}

export default ModalUserList;
