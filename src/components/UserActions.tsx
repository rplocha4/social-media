import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import useClickOutside from '../hooks/useClickOutside';
import { useSetUserPrivateMutation } from '../store/features/serverApi';
import { useDispatch } from 'react-redux';
import { showInfo } from '../store/uiSlice';
import Modal from './UI/Modal';
import Notifications from './Notifications';

const UserActions: React.FC<{
  isPrivate: number;
  onChange: () => void;
  user_id: string;
}> = ({ isPrivate, onChange, user_id }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [optionsOpen, setOptionsOpen] = useClickOutside(ref);
  const [notification, setNotification] = React.useState(false);
  const [setPrivate] = useSetUserPrivateMutation();
  const dispatch = useDispatch();

  return (
    <>
      {notification && (
        <Modal
          onClose={() => {
            setNotification(false);
          }}
        >
          <Notifications
            onClose={() => {
              setNotification(false);
            }}
          />
        </Modal>
      )}
      <div className="relative ">
        <BsThreeDots
          className="
    text-2xl font-bold cursor-pointer hover:text-slate-400 transition duration-300 ease-in-out"
          onClick={() => {
            setOptionsOpen(!optionsOpen);
          }}
        />
        {optionsOpen && (
          <div
            className="absolute right-0 -bottom-20 bg-slate-900 w-32 flex flex-col items-center justify-center rounded-md"
            ref={ref}
          >
            {isPrivate === 0 ? (
              <button
                className="font-bold cursor-pointer hover:bg-slate-800 rounded-md p-2 w-full "
                onClick={() => {
                  setPrivate({ user_id, setPrivate: 1 }).then(() => {
                    dispatch(
                      showInfo({
                        message: 'Successfully made private',
                        color: 'green',
                      })
                    );
                    setOptionsOpen(false);
                    setTimeout(() => {
                      onChange();

                      dispatch(showInfo({ message: '' }));
                    }, 2000);
                  });
                }}
              >
                Make private
              </button>
            ) : (
              <button
                className="text-white font-bold cursor-pointer hover:bg-slate-800 rounded-md p-2 w-full"
                onClick={() => {
                  setPrivate({ user_id, setPrivate: 0 }).then(() => {
                    dispatch(
                      showInfo({
                        message: 'Successfully made public',
                        color: 'green',
                      })
                    );
                    setOptionsOpen(false);

                    setTimeout(() => {
                      dispatch(showInfo({ message: '' }));
                      onChange();
                    }, 2000);
                  });
                }}
              >
                Make public
              </button>
            )}
            <button
              className="
          font-bold cursor-pointer hover:bg-slate-800 rounded-md p-2 w-full"
              onClick={() => {
                setNotification(true);
              }}
            >
              Notifications
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserActions;
