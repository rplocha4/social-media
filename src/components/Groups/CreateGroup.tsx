import React, { useState } from 'react';
import Modal from '../UI/Modal';

function CreateGroup({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (formData: FormData) => void;
}) {
  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState<File | null>(null);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', groupName);
    formData.append('admin_id', localStorage.getItem('user_id') as string);
    if (groupImage) formData.append('image', groupImage);
    onCreate(formData);
  };

  return (
    <Modal onClose={onClose}>
      <form
        action=""
        onSubmit={submitHandler}
        className="flex flex-col items-center p-2 gap-4"
      >
        <input
          type="text"
          name="group_name"
          className="
            p-2
            rounded-xl
            bg-zinc-800
            text-white
            border-2
            border-gray-500
            
          "
          id="group_name"
          placeholder="Group name"
          onChange={(e) => setGroupName(e.target.value)}
          value={groupName}
        />
        <div className="flex items-center gap-2 p-2 rounded-xl text-white">
          <p>Group image</p>

          <input
            type="file"
            name="group_image"
            id="group_image"
            accept="image/*"
            onChange={(event) => {
              event.target.files && setGroupImage(event.target.files[0]);
            }}
          />
        </div>
        <button
          type="submit"
          className="p-2 rounded-xl bg-green-800 text-white border-2 border-green-500
        
        "
        >
          Create
        </button>
      </form>
    </Modal>
  );
}

export default CreateGroup;
