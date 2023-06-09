import React from 'react';
import Modal from '../UI/Modal';
import useAutosizeTextArea from '../../hooks/useAutosizeTextArea';
import { useCreateEventMutation } from '../../store/features/serverApi';
import { useDispatch } from 'react-redux';
import { hideInfo, showInfo } from '../../store/uiSlice';
import useInput from '../../hooks/useInput';

const isNotEmpty = (value: string) => value.trim() !== '';

function CreateEvent({ onClose }: { onClose: () => void }) {
  const {
    value: description,
    isValid: descriptionIsValid,
    hasErrors: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    valueBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput(isNotEmpty);
  const {
    value: name,
    isValid: nameIsValid,
    hasErrors: nameHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);
  const {
    value: date,
    isValid: dateIsValid,
    hasErrors: dateHasError,
    valueChangeHandler: dateChangeHandler,
    valueBlurHandler: dateBlurHandler,
    reset: resetDate,
  } = useInput(isNotEmpty);
  const {
    value: image,
    isValid: imageIsValid,
    hasErrors: imageHasError,
    valueChangeHandler: imageChangeHandler,
    valueBlurHandler: imageBlurHandler,
    reset: resetImage,
  } = useInput(isNotEmpty);

  //   const [description, setDescription] = React.useState('');
  //   const [name, setName] = React.useState('');
  //   const [date, setDate] = React.useState('');
  //   const [image, setImage] = React.useState('');
  const descriptionRef = React.useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(descriptionRef.current, description);
  const dispatch = useDispatch();

  const [createEvent] = useCreateEventMutation();

  let formIsValid = false;
  if (nameIsValid && descriptionIsValid && dateIsValid && imageIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    createEvent({
      body: {
        name,
        description,
        date,
        image,
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
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          {nameHasError && (
            <p className="text-red-500">Name must not be empty</p>
          )}
          <textarea
            placeholder="Event description"
            className="bg-zinc-800 text-white p-2 rounded-xl  outline-none  resize-none"
            ref={descriptionRef}
            value={description}
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}
          />
          {descriptionHasError && (
            <p className="text-red-500">Date must not be empty</p>
          )}

          <input
            type="date"
            placeholder="Event date"
            className="bg-zinc-800 text-white p-2 rounded-xl"
            value={date}
            onChange={dateChangeHandler}
            onBlur={dateBlurHandler}
          />
          {dateHasError && (
            <p className="text-red-500">Date must not be empty</p>
          )}
          <input
            type="text"
            placeholder="Event image"
            className="bg-zinc-800 text-white p-2 rounded-xl"
            value={image}
            onChange={imageChangeHandler}
            onBlur={imageBlurHandler}
          />
          {imageHasError && (
            <p className="text-red-500">Image must not be empty</p>
          )}

          {image && (
            <>
              <img src={image} alt="" className="w-1/2 h-1/2" />
              <button
                className="bg-red-500 hover:bg-red-400 p-2 rounded-xl"
                onClick={() => resetImage()}
              >
                Remove
              </button>
            </>
          )}
          <button className="bg-green-500 hover:bg-green-400 p-2 rounded-xl">
            Create
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default CreateEvent;
