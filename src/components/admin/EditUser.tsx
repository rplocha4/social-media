import React, { useState } from 'react';
import Modal from '../UI/Modal';
import { useEditUserMutation } from '../../store/features/serverApi';
import { useShowInfo } from '../context/ShowInfoProvider';

function EditUser({
  username,
  email,
  user_id,
  onClose,
  onRefetch,
}: {
  username: string;
  email: string;
  user_id: string;
  onClose: () => void;
  onRefetch: () => void;
}) {
  const [editingUsername, setEditingUsername] = useState(username);
  const [editingEmail, setEditingEmail] = useState(email);
  const [editUser] = useEditUserMutation();
  const { displayInfo } = useShowInfo();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingUsername || !editingEmail) return;
    editUser({
      body: {
        username: editingUsername,
        email: editingEmail,
      },
      user_id,
    }).then(() => {
      displayInfo({
        message: 'User updated',
        color: 'blue',
      });
    });

    onRefetch();
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col gap-4 item-center justify-center p-5">
        <h1 className="font-bold text-3xl text-center">
          Edit user {username} {email}
        </h1>
        <form
          action=""
          onSubmit={submitHandler}
          className="flex flex-col gap-3 justify-center items-center p-5"
        >
          <input
            type="text"
            placeholder="Username"
            value={editingUsername}
            onChange={(e) => setEditingUsername(e.target.value)}
            className="p-2 rounded-xl bg-zinc-800 text-white"
          />

          <input
            type="text"
            placeholder="Email"
            value={editingEmail}
            onChange={(e) => setEditingEmail(e.target.value)}
            className="p-2 rounded-xl bg-zinc-800 text-white"
          />
          <button
            className="
            bg-slate-700 text-white rounded-md px-2 py-1 shadow-md hover:bg-slate-600 transition duration-300 ease-in-out
          "
          >
            Save
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default EditUser;
