import { useEffect, useState } from "react";
import { fetchEvents } from "../api/eventAPI";
import EventCard from "./EventCard";
import { TEvent } from "../types/types";
import { useAuth } from "./Auth";

const EventList: React.FC = () => {
  const [events, setEvents] = useState<TEvent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    fetchEvents()
      .then((events) => {
        const filteredEvents = isLoggedIn
          ? events
          : events.filter(
              (event: { permission: string }) => event.permission !== "private"
            );
        setEvents(filteredEvents);
      })
      .catch(console.error);
  }, [isLoggedIn]);

  const filteredEvents = searchQuery
    ? events.filter((event) =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : events;

  return (
    <div className="flex flex-col items-center w-full">
      <input
        type="text"
        placeholder="Search events..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: "100%", maxWidth: "350px" }}
        className="search-input mb-4 p-2 rounded border-2 border-gray-300 text-black"
      />

      {filteredEvents.length > 0 ? (
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-10 px-4 sm:px-6 lg:px-8 justify-center">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </ul>
      ) : (
        <div className="text-center mt-3 h3-semibold">
          No events matches your search.
        </div>
      )}
    </div>
  );
};

export default EventList;
