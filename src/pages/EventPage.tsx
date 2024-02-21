import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEventById } from "../api/eventAPI";
import { TEvent, TSpeaker } from "../types/types";
import EventCard from "../components/EventCard";
import { useAuth } from "@/components/Auth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EventPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<TEvent | null>(null);
  const [relatedEvents, setRelatedEvents] = useState<TEvent[]>([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchEventData = async () => {
      if (eventId) {
        const fetchedEvent = await fetchEventById(parseInt(eventId));
        setEvent(fetchedEvent);

        const fetchedRelatedEvents = await Promise.all(
          fetchedEvent.related_events.map((id: number) => fetchEventById(id))
        );

        const visibleRelatedEvents = isLoggedIn
          ? fetchedRelatedEvents
          : fetchedRelatedEvents.filter(
              (event) => event.permission !== "private"
            );

        setRelatedEvents(visibleRelatedEvents);
      }
    };

    fetchEventData();
  }, [eventId, isLoggedIn]);

  const getPermissionColor = (permission?: string) => {
    return permission === "public"
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-600";
  };

  return (
    <>
      <Header />
      <h1 className="flex-center h1-bold mb-5">
        Event Details
      </h1>
      <section
        className="flex justify-center bg-white bg-dotted-pattern text-black bg-contain md:ml-20 md:mr-20 md:mt-10 md:rounded"
        style={{
          boxShadow:
            "0 4px 10px rgba(255, 255, 255, 0.3), 0 10px 20px rgba(255, 255, 255, 0.2)",
          transition: "box-shadow 0.3s ease-in-out",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.boxShadow =
            "0 8px 15px rgba(255, 255, 255, 0.5), 0 15px 30px rgba(255, 255, 255, 0.4)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.boxShadow =
            "0 4px 10px rgba(255, 255, 255, 0.3), 0 10px 20px rgba(255, 255, 255, 0.2)")
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          {/* Background Image */}
          <img
            src="/assets/card-background.png"
            alt="card-background"
            width={1000}
            height={1000}
            className="h-full min-h-[300px] w-auto max-w-full object-cover object-center rounded"
          />
          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            {event && (
              <>
                <div className="flex flex-col gap-6">
                  {/* Event Name */}
                  <h2 className="h2-bold">{event.name}</h2>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="flex gap-3">
                      {/* Permission */}
                      <p
                        className={`base-semibold rounded-full px-5 py-2 ${getPermissionColor(
                          event.permission
                        )}`}
                      >
                        {event.permission?.toUpperCase()}
                      </p>

                      {/* Event Type */}
                      <p className="base-semibold rounded-full bg-gray-500/10 px-5 py-2 text-gray-500">
                        {event.event_type.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Speaker */}
                {event.speakers.map((speaker: TSpeaker) => (
                  <span
                    key={speaker.name}
                    className="h3-semibold text-primary-500 sm:mt-0"
                  >
                    Speaker: {speaker.name}
                  </span>
                ))}

                {/* Date and Time */}
                <div className="flex flex-col gap-5">
                  <div className="flex gap-2 md:gap-3">
                    <p className="base-semibold lg:body-semibold flex flex-wrap items-center text-gray-500">
                      {new Date(event.start_time).toLocaleString()} -{" "}
                      {new Date(event.end_time).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Event Description */}
                <div className="flex flex-col gap-2">
                  <p className="h3-semibold text-gray-600">
                    Event Description:
                  </p>
                  <p className="base-regular text-gray-500 lg:body-regular">
                    {event.description}
                  </p>
                </div>

                {/* Event Links */}
                <div className="flex flex-row gap-4">
                  {event.public_url && (
                    <a
                      href={event.public_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block base-semibold bg-blue-500 text-white text-center py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline"
                    >
                      Public Event Link
                    </a>
                  )}
                  {isLoggedIn && event.private_url && (
                    <a
                      href={event.private_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block base-semibold bg-blue-500 text-white text-center py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline"
                    >
                      Private Event Link
                    </a>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Related Events */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related Events:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
          {relatedEvents.map((relatedEvent) => (
            <EventCard key={relatedEvent.id} event={relatedEvent} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default EventPage;
