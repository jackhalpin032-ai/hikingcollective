import { Mountain, Bike, PersonStanding, Snowflake, Hand, Users } from 'lucide-react';
import type { ActivityType } from './types';

interface ActivityIconProps {
  type: ActivityType;
  className?: string;
}

export function ActivityIcon({ type, className = "h-8 w-8" }: ActivityIconProps) {
  switch (type) {
    case 'hiking':
      return <PersonStanding className={className} />;
    case 'cycling':
      return <Bike className={className} />;
    case 'via-ferrata':
      return <Mountain className={className} />;
    case 'skiing':
      return <Snowflake className={className} />;
    case 'bouldering':
      return <Hand className={className} />;
    case 'social':
      return <Users className={className} />;
    default:
      return <PersonStanding className={className} />;
  }
}
