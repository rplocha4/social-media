import { useEffect, useState } from 'react';
import {
  useGetEventsQuery,
  useLazyUserEventsQuery,
} from '../store/features/serverApi';
import Loading from '../components/UI/Loading';
import CreateEvent from '../components/Events/CreateEvent';
import { TEvent } from '../types/types';
import EventsResults from '../components/Events/EventsResult';
import { useTheme } from '../components/context/ThemeProvider';

function Events() {
  const [filter, setFilter] = useState('all');
  const [creatingEvent, setCreatingEvent] = useState(false);
  const username = localStorage.getItem('username') as string;
  const { theme } = useTheme();

  const { data: events, isFetching, refetch } = useGetEventsQuery('');
  const [userEvents, { isFetching: isUserEventsFetching }] =
    useLazyUserEventsQuery();
  const [results, setResults] = useState<TEvent[]>([]);

  useEffect(() => {
    if (filter === 'all') {
      refetch().then((res) => {
        if (!res.data) return;
        setResults(res.data as TEvent[]);
      });
    } else {
      userEvents(username).then((res) => {
        if (!res.data) return;
        setResults(res.data as TEvent[]);
      });
    }
  }, [filter, events, userEvents, username, refetch]);

  // if () return <Loading />;

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center w-full h-full">
        <button
          className={`text-5xl  font-bold  w-1/2 border-r border-b p-5 ${
            theme === 'dark' ? 'hover:bg-zinc-700' : 'hover:bg-zinc-400'
          }`}
          onClick={() => setFilter('all')}
        >
          All events
        </button>
        <button
          className={`text-5xl  font-bold  w-1/2 border-b  p-5 ${
            theme === 'dark' ? 'hover:bg-zinc-700' : 'hover:bg-zinc-400'
          }`}
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
      {!isFetching && !isUserEventsFetching ? (
        <div className="flex justify-center h-full">
          {results.length === 0 ? (
            <p className="text-2xl font-bold p-5">No results</p>
          ) : (
            <div
              className={`flex flex-col w-full ${
                theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'
              }`}
            >
              <h1
                className="
            text-2xl font-bold text-center p-5
            "
              >
                {filter === 'all' ? 'All events' : 'Your events'} (
                {results.length})
              </h1>
              <EventsResults events={results} onRefetch={refetch} />
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Events;
