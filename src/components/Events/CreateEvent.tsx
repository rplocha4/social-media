import React from 'react';
import Modal from '../UI/Modal';
import useAutosizeTextArea from '../../hooks/useAutosizeTextArea';
import { useCreateEventMutation } from '../../store/features/serverApi';
import { useDispatch } from 'react-redux';
import { hideInfo, showInfo } from '../../store/uiSlice';

function CreateEvent({ onClose }: { onClose: () => void }) {
  const [description, setDescription] = React.useState('');
  const [name, setName] = React.useState('');
  const [date, setDate] = React.useState('');
  const descriptionRef = React.useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(descriptionRef.current, description);
  const dispatch = useDispatch();

  const [createEvent] = useCreateEventMutation();

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    createEvent({
      body: {
        name,
        description,
        date,
      },
    })
      .then((res) => {
        dispatch(showInfo({ message: 'Event created', color: 'green' }));
        setTimeout(() => {
          dispatch(hideInfo());
        }, 3000);
      })
      .catch((err) => {
        dispatch(showInfo({ message: 'Error creating event', color: 'red' }));
        setTimeout(() => {
          dispatch(hideInfo());
        }, 3000);
      });

    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col gap-2 p-12">
        <h1 className="text-4xl font-bold text-center text-white bg-zinc-800 p-5 rounded-xl">
          Create Event
        </h1>
        <form
          action=""
          className="flex flex-col gap-2"
          onSubmit={submitHandler}
        >
          <input
            type="text"
            placeholder="Event name"
            className="bg-zinc-800 text-white p-2 rounded-xl"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <textarea
            placeholder="Event description"
            className="bg-zinc-800 text-white p-2 rounded-xl  outline-none  resize-none"
            ref={descriptionRef}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <input
            type="date"
            placeholder="Event date"
            className="bg-zinc-800 text-white p-2 rounded-xl"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <button className="bg-green-500 hover:bg-green-400 p-2 rounded-xl">
            Create
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default CreateEvent;
