import React from 'react';
import { TEvent } from '../../types/types';
import EventCard from './EventCard';

function EventsResult({
  events,
  onRefetch,
}: {
  events: TEvent[];
  onRefetch: () => void;
}) {
  return (
    <div className="grid  grid-cols-1 lg:grid-cols-2 gap-5 bg-zinc-800 p-10 w-full">
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
