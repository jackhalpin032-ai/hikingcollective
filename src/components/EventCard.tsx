import { Bookmark, Star } from "lucide-react";

interface EventCardProps {
  image: string;
  date: string;
  title: string;
  organizer: string;
  rating: number;
  attendees: number;
  attendeeAvatars: string[];
  soldOut?: boolean;
}

const EventCard = ({
  image,
  date,
  title,
  organizer,
  rating,
  attendees,
  attendeeAvatars,
  soldOut = false,
}: EventCardProps) => {
  return (
    <div className="flex-shrink-0 w-64 md:w-72 group">
      {/* Image */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted mb-3">
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Bookmark button */}
        <button className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors">
          <Bookmark className="h-4 w-4 text-foreground" />
        </button>

        {/* Sold out badge */}
        {soldOut && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-warning text-warning-foreground text-xs font-semibold rounded-full flex items-center gap-1">
            <span>🎫</span>
            Sold out - Join waiting list
          </div>
        )}
      </div>

      {/* Content */}
      <div>
        <p className="text-xs text-muted-foreground mb-1">{date}</p>
        <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
          <span>by {organizer}</span>
          <span>•</span>
          <span className="flex items-center gap-0.5">
            {rating}
            <Star className="h-3 w-3 fill-warning text-warning" />
          </span>
        </div>
        
        {/* Attendees */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {attendeeAvatars.slice(0, 3).map((avatar, index) => (
              <div
                key={index}
                className="h-6 w-6 rounded-full border-2 border-background overflow-hidden bg-muted"
              >
                <img
                  loading="lazy"
                  src={avatar}
                  alt="Attendee"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {attendees} attendees
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
