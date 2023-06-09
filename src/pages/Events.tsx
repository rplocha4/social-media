import React, { useEffect, useMemo, useState } from 'react';
import {
  useGetEventsQuery,
  useLazyUserEventsQuery,
} from '../store/features/serverApi';
import Loading from '../components/UI/Loading';
import CreateEvent from '../components/Events/CreateEvent';
import EventCard from '../components/Events/EventCard';
import { TEvent } from '../types/types';

function Events() {
  const [filter, setFilter] = useState('all');
  const [creatingEvent, setCreatingEvent] = useState(false);
  const user_id = localStorage.getItem('user_id') as string;

  const { data: events, isLoading, refetch } = useGetEventsQuery('');
  const [userEvents] = useLazyUserEventsQuery();
  const [results, setResults] = useState<TEvent[]>([]);
  useEffect(() => {
    if (filter === 'all') {
      if (!events) return;
      setResults(events as TEvent[]);
    } else {
      userEvents(user_id).then((res) => {
        if (!res.data) return;
        setResults(res.data as TEvent[]);
      });
    }
  }, [filter, events, userEvents, user_id]);

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col  min-h-screen w-full">
      <div className="flex justify-center w-full h-full">
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
      <button
        className="flex items-center justify-center text-3xl bg-green-500 hover:bg-green-400 p-5 "
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
      <div className="flex justify-center h-full">
        {results.length === 0 ? (
          <p className="text-2xl font-bold p-5">No results</p>
        ) : (
          <div className="flex flex-col bg-zinc-800 ">
            <h1
              className="
            text-2xl font-bold text-center p-5
            "
            >
              {filter === 'all' ? 'All events' : 'Your events'} (
              {results.length})
            </h1>
            <div className="grid grid-cols-2 gap-5 bg-zinc-800 p-10 h-full ">
              {results.map((event: TEvent) => {
                return (
                  <EventCard
                    key={event.id}
                    event={event}
                    participants={event.users}
                    onRefetch={refetch}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
