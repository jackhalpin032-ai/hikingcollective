import { forwardRef } from 'react';
import { Bike, Footprints, Mountain, ArrowUpRight } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SidebarEventCardProps {
  date: string;
  dayOfWeek: string;
  title: string;
  time: string;
  location: string;
  transportMethod: string;
  activity: string;
  difficulty?: string;
  distance: string;
  elevation: string;
  attendeeAvatars: string[];
  additionalAttendees?: number;
  organizer: string;
  isPast?: boolean;
  images?: string[];
}

const activityIcons: Record<string, React.ReactNode> = {
  Hiking: <Footprints className="h-3 w-3" />,
  Cycling: <Bike className="h-3 w-3" />,
  Climbing: <Mountain className="h-3 w-3" />,
};

const SidebarEventCard = forwardRef<HTMLDivElement, SidebarEventCardProps>(({
  date,
  dayOfWeek,
  title,
  time,
  location,
  transportMethod,
  activity,
  difficulty,
  distance,
  elevation,
  attendeeAvatars,
  additionalAttendees,
  organizer,
  isPast = false,
  images,
}, ref) => {
  return (
    <div ref={ref} className="py-4 border-b border-border last:border-b-0">
      <div className="flex gap-3">
        {/* Date column */}
        <div className="text-center w-10 flex-shrink-0">
          <p className="text-sm font-medium text-foreground">{date}</p>
          <p className="text-xs text-muted-foreground">{dayOfWeek}</p>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm text-foreground line-clamp-2 leading-tight mb-1">
            {title}
          </h4>
          <p className="text-xs text-muted-foreground mb-2">
            at {time} from {location} by {transportMethod}
          </p>

          {/* Activity badges */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            {difficulty && (
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                {difficulty}
              </Badge>
            )}
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              {activityIcons[activity]}
              {activity}
            </span>
            <span className="text-xs text-muted-foreground">↔ {distance}</span>
            <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
              <ArrowUpRight className="h-3 w-3" />
              {elevation}
            </span>
          </div>

          {/* Attendees */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {attendeeAvatars.slice(0, 3).map((avatar, index) => (
                <Avatar key={index} className="h-5 w-5 border border-background">
                  <AvatarImage src={avatar} />
                  <AvatarFallback className="text-[8px]">U</AvatarFallback>
                </Avatar>
              ))}
            </div>
            {additionalAttendees && additionalAttendees > 0 && (
              <span className="text-xs text-muted-foreground">
                +{additionalAttendees}, by {organizer}
              </span>
            )}
            {isPast && (
              <Button variant="outline" size="sm" className="ml-auto h-6 text-xs px-2">
                Write reviews
              </Button>
            )}
            {!isPast && (
              <span className="text-xs text-muted-foreground ml-auto">full</span>
            )}
          </div>

          {/* Past event images */}
          {isPast && images && images.length > 0 && (
            <div className="flex gap-1 mt-2">
              {images.slice(0, 3).map((img, index) => (
                <img 
                  key={index}
                  src={img} 
                  alt="Event memory"
                  className="w-12 h-12 rounded-lg object-cover"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

SidebarEventCard.displayName = 'SidebarEventCard';

export default SidebarEventCard;
