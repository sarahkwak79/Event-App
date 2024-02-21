import { useNavigate } from "react-router-dom";
import { TEvent, TSpeaker } from "../types/types";

interface EventCardProps {
  event: TEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();

  const onEventClick = () => {
    navigate(`/event/${event.id}`);
  };

  const getPermissionColor = (permission?: string) => {
    return permission === "public"
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-600";
  };

  const wordCount = (text: string, maxWords: number) => {
    const words = text.split(" ");
    return words.length > maxWords ? "" : "pb-8";
  };

  return (
    <div
      className="group relative flex h-[380px] w-full max-w-[400px] min-w-[350px] md:min-w-[400px] flex-col overflow-hidden rounded-xl bg-white md:h-[438px]"
      onClick={onEventClick}
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
      {/* Background Image*/}
      <img
        src="/assets/card-background.png"
        alt="card-background"
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center h-40 w-full object-cover"
      />

      <div className="p-3">
        <div className="flex gap-2">
          {/* Permissions */}
          <span
            className={`small-semibold w-min rounded-full px-4 py-1 ${getPermissionColor(
              event.permission
            )}`}
          >
            {event.permission?.toUpperCase()}
          </span>
          {/*Event Type */}
          <p className="small-semibold w-min rounded-full bg-gray-500/10 px-4 py-1 text-gray-500">
            {event.event_type.toUpperCase()}
          </p>
        </div>

        {/* Date and Time */}
        <p className="small-semibold pt-4 pb-2 text-gray-500">
          {new Date(event.start_time).toLocaleString()} -{" "}
          {new Date(event.end_time).toLocaleString()}
        </p>

        {/* Event Name */}
        <h3
          className={`h3-bold mb-10 line-clamp-2 text-black ${wordCount(
            event.name,
            5
          )}`}
        >
          {event.name}
        </h3>

        {/* Speaker */}
        {event.speakers && event.speakers.length > 0 ? (
          <div className="flex-between w-full">
            {event.speakers.map((speaker: TSpeaker) => (
              <p
                key={speaker.name}
                className="small-semibold md:base-semibold text-gray-600"
              >
                Speaker: {speaker.name}
              </p>
            ))}
          </div>
        ) : (
          <div className="pb-6" />
        )}
      </div>
    </div>
  );
};

export default EventCard;
