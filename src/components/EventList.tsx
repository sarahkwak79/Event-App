import React, { useEffect, useState } from "react";
import { fetchEvents } from "../api/eventAPI";
import EventCard from "./EventCard";
import { TEvent } from "../types/types";
import { useAuth } from "./Auth";
import { sortEvents } from "@/utils/sortEvents";

const EventList: React.FC = () => {
  const [events, setEvents] = useState<TEvent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [eventTypeFilter, setEventTypeFilter] = useState("all");
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    fetchEvents()
      .then((events) => {
        const filteredEvents = isLoggedIn
          ? events
          : events.filter(
              (event: { permission: string }) => event.permission !== "private"
            );
        const sortedEvents = sortEvents(filteredEvents);
        setEvents(sortedEvents);
      })
      .catch(console.error);
  }, [isLoggedIn]);

  const filteredEvents = events.filter((event) => {
    const matchesType =
      eventTypeFilter === "all" || event.event_type === eventTypeFilter;
    const matchesSearch = event.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const eventTypes = Array.from(
    new Set(events.map((event) => event.event_type))
  );

  return (
    <div className="flex flex-col items-center w-full mb-10">
      <div className="flex flex-row gap-5 mt-5 items-center">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input base-semibold mb-4 p-2 rounded border-2 border-gray-300 text-black w-3/4"
        />

        {/* Event type dropdown */}
        <select
          value={eventTypeFilter}
          onChange={(e) => setEventTypeFilter(e.target.value)}
          className="mb-4 p-2 rounded border-2 base-semibold border-gray-300 text-black h-10"
          style={{ width: "110px" }}
        >
          <option value="all">All Types</option>
          {eventTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Event cards */}
      {filteredEvents.length > 0 ? (
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-10 px-4 sm:px-6 lg:px-8 justify-center">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </ul>
      ) : (
        <div className="text-center mt-3 h3-semibold">
          No events match your filters.
        </div>
      )}
    </div>
  );
};

export default EventList;
