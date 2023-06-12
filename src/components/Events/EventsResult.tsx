import { TEvent } from '../../types/types';
import { useTheme } from '../context/ThemeProvider';
import EventCard from './EventCard';

function EventsResult({
  events,
  onRefetch,
}: {
  events: TEvent[];
  onRefetch: () => void;
}) {
  const { theme } = useTheme();
  return (
    <div
      className={`grid  grid-cols-1 lg:grid-cols-2 gap-5 p-10 w-full ${
        theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-100'
      }`}
    >
      {events.map((event: TEvent) => {
        return (
          <div key={event.id}>
            <EventCard
              event={event}
              participants={event.users}
              onRefetch={onRefetch}
            />
          </div>
        );
      })}
    </div>
  );
}

export default EventsResult;
