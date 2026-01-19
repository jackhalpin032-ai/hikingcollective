import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Mountain, Bike, Footprints, TreePine } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface EventRowProps {
  id: number;
  image: string;
  time: string;
  duration: string;
  title: string;
  organizer: string;
  organizerAvatar?: string;
  departureLocation: string;
  transportMethod: string;
  activity: string;
  difficulty?: string;
  distance: string;
  elevation: string;
  totalHeight?: string;
  attendees: number;
  availableSpots?: number;
  waitlist?: number;
  attendeeAvatars: string[];
}

const activityIcons: Record<string, React.ReactNode> = {
  Hiking: <Footprints className="h-4 w-4" />,
  Cycling: <Bike className="h-4 w-4" />,
  Climbing: <Mountain className="h-4 w-4" />,
  'Trail Running': <TreePine className="h-4 w-4" />,
};

const EventRow = forwardRef<HTMLDivElement, EventRowProps>(({
  id,
  image,
  time,
  duration,
  title,
  organizer,
  organizerAvatar,
  departureLocation,
  transportMethod,
  activity,
  difficulty,
  distance,
  elevation,
  totalHeight,
  attendees,
  availableSpots,
  waitlist,
  attendeeAvatars,
}, ref) => {
  const isFull = availableSpots === 0 || !!waitlist;

  return (
    <Link to={`/events/${id}`} className="block">
      <div 
        ref={ref}
        className="grid grid-cols-[60px_1fr_1fr_1.2fr_1fr] gap-4 py-4 border-b border-border hover:bg-muted/30 transition-colors cursor-pointer items-center"
      >
      {/* Time & Duration */}
      <div className="text-sm">
        <p className="font-semibold text-foreground">{time}</p>
        <p className="text-muted-foreground text-xs">{duration}</p>
      </div>

      {/* Image, Title & Organizer */}
      <div className="flex items-center gap-3">
        <img 
          src={image} 
          alt={title}
          className="w-14 h-10 rounded-lg object-cover flex-shrink-0"
        />
        <div className="min-w-0">
          <p className="font-medium text-foreground text-sm line-clamp-2 leading-tight">{title}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Avatar className="h-4 w-4">
              <AvatarImage src={organizerAvatar} />
              <AvatarFallback className="text-[8px]">{organizer[0]}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">by {organizer}</span>
          </div>
        </div>
      </div>

      {/* Departure */}
      <div className="text-sm">
        <p className="text-foreground">{departureLocation}</p>
        <p className="text-muted-foreground text-xs">by {transportMethod}</p>
      </div>

      {/* Activity Details */}
      <div className="text-sm">
        <div className="flex items-center gap-1.5 mb-0.5">
          {activityIcons[activity] || <Mountain className="h-4 w-4" />}
          <span className="font-medium">{activity}</span>
          {difficulty && (
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-primary/10 text-primary">
              {difficulty}
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground text-xs">
          {distance} • {elevation} elevation{totalHeight && ` • ${totalHeight} total height`}
        </p>
      </div>

      {/* Participants */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm">
            <span className="font-medium">{attendees} coming</span>
            {availableSpots !== undefined && (
              <span className="text-primary"> / {availableSpots} available</span>
            )}
            {waitlist !== undefined && (
              <span className="text-muted-foreground"> / {waitlist} in waitlist</span>
            )}
          </p>
        </div>
        <div className="flex -space-x-2">
          {attendeeAvatars.slice(0, 4).map((avatar, index) => (
            <Avatar key={index} className="h-7 w-7 border-2 border-background">
              <AvatarImage src={avatar} />
              <AvatarFallback className="text-xs">U</AvatarFallback>
            </Avatar>
          ))}
        </div>
        {isFull && (
          <span className="text-xs text-muted-foreground ml-2">full</span>
        )}
      </div>
      </div>
    </Link>
  );
});

EventRow.displayName = 'EventRow';

export default EventRow;
