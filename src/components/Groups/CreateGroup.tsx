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
        className="flex flex-col p-2 gap-4"
      >
        <input
          type="text"
          name="group_name"
          id="group_name"
          onChange={(e) => setGroupName(e.target.value)}
          value={groupName}
        />

        <input
          type="file"
          name="group_image"
          id="group_image"
          accept="image/*"
          onChange={(event) => {
            event.target.files && setGroupImage(event.target.files[0]);
          }}
        />
        <button type="submit">Create</button>
      </form>
    </Modal>
  );
}

export default CreateGroup;
