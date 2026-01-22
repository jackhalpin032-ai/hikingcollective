import { Bike, Snowflake, Mountain } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ActivityType } from './types';

interface ActivityIconProps {
  type: ActivityType;
  className?: string;
}

// Custom hiking icon matching reference
const HikingIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="4" r="2" />
    <path d="M7 21l3-9" />
    <path d="M17 21l-3-9" />
    <path d="M10 12l-3-3 4-1 3 3" />
    <path d="M17 8l-4 1" />
  </svg>
);

// Custom climbing icon
const ClimbingIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="4" r="2" />
    <path d="M8 21V11" />
    <path d="M8 11l4-3" />
    <path d="M16 21V11" />
    <path d="M16 11l-4-3" />
    <path d="M12 8v5" />
  </svg>
);

// Custom bouldering icon (grip/dots pattern)
const BoulderingIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="6" cy="6" r="2" />
    <circle cx="12" cy="6" r="2" />
    <circle cx="18" cy="6" r="2" />
    <circle cx="6" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="18" cy="12" r="2" />
    <circle cx="6" cy="18" r="2" />
    <circle cx="12" cy="18" r="2" />
    <circle cx="18" cy="18" r="2" />
  </svg>
);

// Custom social icon (people connected)
const SocialIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="9" cy="7" r="3" />
    <circle cx="15" cy="7" r="3" />
    <path d="M5 21v-2a4 4 0 0 1 4-4h2" />
    <path d="M19 21v-2a4 4 0 0 0-4-4h-2" />
  </svg>
);

export function ActivityIcon({ type, className }: ActivityIconProps) {
  const iconClass = cn("h-6 w-6", className);
  
  switch (type) {
    case 'hiking':
      return <HikingIcon className={iconClass} />;
    case 'cycling':
      return <Bike className={iconClass} />;
    case 'climbing':
      return <ClimbingIcon className={iconClass} />;
    case 'skiing':
      return <Snowflake className={iconClass} />;
    case 'bouldering':
      return <BoulderingIcon className={iconClass} />;
    case 'social':
      return <SocialIcon className={iconClass} />;
    default:
      return <Mountain className={iconClass} />;
  }
}
