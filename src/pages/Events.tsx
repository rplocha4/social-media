import React, { useState } from 'react';
import { useGetEventsQuery } from '../store/features/serverApi';
import Loading from '../components/UI/Loading';
import CreateEvent from '../components/Events/CreateEvent';
import EventCard from '../components/Events/EventCard';

function Events() {
  const [filter, setFilter] = useState('all');
  const [creatingEvent, setCreatingEvent] = useState(false);

  const { data: events, isLoading, refetch } = useGetEventsQuery('');

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col  min-h-screen w-full">
      <div className="flex justify-center w-full">
        <button
          className="text-5xl  font-bold py-2 px-4 w-1/2 border-r border-b hover:bg-zinc-800"
          onClick={() => setFilter('all')}
        >
          All events
        </button>
        <button
          className="text-5xl  font-bold py-2 px-4 w-1/2 border-b  hover:bg-zinc-800"
          onClick={() => setFilter('yours')}
        >
          Yours events
        </button>
      </div>
      <div className="flex items-center text-3xl bg-green-500 hover:bg-green-400 p-5">
        <button
          className="grow"
          onClick={() => {
            setCreatingEvent(true);
          }}
        >
          Create New Event
        </button>
        {creatingEvent && (
          <CreateEvent
            onClose={() => {
              setCreatingEvent(false);
              refetch();
            }}
          />
        )}
      </div>
      <div className="flex justify-center">
        {events.length === 0 ? (
          <p className="text-2xl font-bold p-5">No events</p>
        ) : (
          <div className="grid grid-cols-2 gap-5 bg-zinc-800 p-10 ">
            {events.map(
              (event: {
                id: string;
                name: string;
                description: string;
                date: string;
                users: {
                  user_id: string;
                  username: string;
                  avatar: string;
                }[];
              }) => {
                return (
                  <EventCard
                    key={event.id}
                    event={event}
                    participants={event.users}
                    onRefetch={refetch}
                  />
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
