import React from 'react';
import {
  useJoinEventMutation,
  useLeaveEventMutation,
} from '../../store/features/serverApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { hideInfo, showInfo } from '../../store/uiSlice';
import ModalUserList from '../UI/ModalUserList';
import { BsFillTrainLightrailFrontFill } from 'react-icons/bs';

type EventCardProps = {
  event: {
    id: string;
    name: string;
    description: string;
    date: string;
  };
  participants: {
    user_id: string;
    username: string;
    avatar: string;
  }[];
  onRefetch: () => void;
};

function EventCard({ event, participants, onRefetch }: EventCardProps) {
  const [showParticipants, setShowParticipants] = React.useState(false);
  const username = localStorage.getItem('username') as string;
  const user_id = localStorage.getItem('user_id') as string;

  const [joinEvent] = useJoinEventMutation();
  const [leaveEvent] = useLeaveEventMutation();
  const [joined, setJoined] = React.useState(
    participants.some((p) => p.username === username)
  );

  const dispatch = useDispatch();

  return (
    <>
      {showParticipants && (
        <ModalUserList
          onClose={() => setShowParticipants(false)}
          type={participants.length === 1 ? 'Participant' : 'Participants'}
          data={participants}
        />
      )}
      <div className="flex flex-col hover:bg-zinc-700 p-5 rounded-xl cursor-pointer">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnZc4nu61fo87fwxBfVNGokRj1TP8t6IrdEQ&usqp=CAU"
          alt=""
          className="rounded-t-md"
        />
        <div className="flex flex-col justify-center p-2">
          <p className="text-sm">
            {event.date.split('T')[0]} AT{' '}
            {event.date.split('T')[1].split('.')[0]}
          </p>
          <p className="font-bold text-xl">{event.name}</p>
          <p>{event.description}</p>
          <p
            className="hover:underline"
            onClick={() => {
              setShowParticipants(true);
            }}
          >
            {participants.length}{' '}
            {participants.length === 1 ? 'participant' : 'participants'}{' '}
          </p>
        </div>
        {!joined ? (
          <button
            className="self-end px-3 py-1 rounded-md bg-green-500 hover:bg-green-400"
            onClick={() => {
              joinEvent({ event_id: event.id, user_id }).then(() => {
                setJoined(true);
                onRefetch();
                dispatch(showInfo({ message: 'Joined event', color: 'green' }));
                setTimeout(() => {
                  dispatch(hideInfo());
                }, 3000);
              });
            }}
          >
            Join
          </button>
        ) : (
          <button
            className="self-end px-3 py-1 rounded-md bg-red-500 hover:bg-red-400"
            onClick={() => {
              leaveEvent({ event_id: event.id, user_id }).then(() => {
                setJoined(false);
                onRefetch();
                dispatch(showInfo({ message: 'Left event', color: 'red' }));
                setTimeout(() => {
                  dispatch(hideInfo());
                }, 3000);
              });
            }}
          >
            Leave
          </button>
        )}
      </div>
    </>
  );
}

export default EventCard;
