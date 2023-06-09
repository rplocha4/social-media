import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import useClickOutside from '../hooks/useClickOutside';
import { useSetUserPrivateMutation } from '../store/features/serverApi';
import Modal from './UI/Modal';
import Notifications from './Notifications';
import { useShowInfo } from './context/ShowInfoProvider';

const UserActions: React.FC<{
  isPrivate: number;
  onChange: () => void;
  user_id: string;
}> = ({ isPrivate, onChange, user_id }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [optionsOpen, setOptionsOpen] = useClickOutside(ref);
  const [notification, setNotification] = React.useState(false);
  const [setPrivate] = useSetUserPrivateMutation();
  const { displayInfo } = useShowInfo();

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
            <button
              className="font-bold cursor-pointer hover:bg-slate-800 rounded-md p-2 w-full "
              onClick={() => {
                isPrivate === 0
                  ? setPrivate({ user_id, setPrivate: 1 }).then(() => {
                      displayInfo({
                        message: 'Successfully made private',
                        color: 'green',
                      });

                      setOptionsOpen(false);
                      setTimeout(() => {
                        onChange();
                      }, 2000);
                    })
                  : setPrivate({ user_id, setPrivate: 0 }).then(() => {
                      displayInfo({
                        message: 'Successfully made public',
                        color: 'green',
                      });
                      setOptionsOpen(false);
                      setTimeout(() => {
                        onChange();
                      }, 2000);
                    });
              }}
            >
              {isPrivate === 0 ? 'Make private' : 'Make public'}
            </button>

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
