import type { TechnicalitySAC, TransportMethod, ActivityType } from './common';

export type EventStatus = 'available' | 'going' | 'organiser' | 'closed' | 'waitlist';

export interface Participant {
  id?: string;
  name: string;
  photo?: string;
}

export interface Organizer {
  id?: string;
  name: string;
  photo?: string;
  rating: number;
  eventsOrganised: number;
}

export interface EventWeather {
  condition: string;
  temp: string;
  wind: string;
  humidity: string;
}

export interface EventRoute {
  highlights: string[];
  warnings: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  dateLabel: string;
  time: string;
  duration: string;
  meetingPoint: string;
  location: string;
  departureLocation: string;
  transport: TransportMethod;
  activity: ActivityType;
  difficulty: TechnicalitySAC;
  distance: string;
  elevation: string;
  totalHeight?: string;
  maxParticipants: number;
  currentParticipants: number;
  availableSpots?: number;
  waitlist?: number;
  status: EventStatus;
  organizer: Organizer;
  participants: Participant[];
  attendeeAvatars: string[];
  requirements: string[];
  whatToBring: string[];
  weather?: EventWeather;
  route?: EventRoute;
}

// Sidebar event card type (simplified)
export interface SidebarEvent {
  id: number;
  date: string;
  dayOfWeek: string;
  title: string;
  time: string;
  location: string;
  transportMethod: string;
  activity: string;
  difficulty: string;
  distance: string;
  elevation: string;
  attendeeAvatars: string[];
  additionalAttendees: number;
  organizer: string;
  isPast?: boolean;
  images?: string[];
}

// Event row type (for listing)
export interface EventRow {
  id: number;
  image: string;
  time: string;
  duration: string;
  title: string;
  organizer: string;
  organizerAvatar: string;
  departureLocation: string;
  transportMethod: string;
  activity: string;
  difficulty: string;
  distance: string;
  elevation: string;
  totalHeight: string;
  attendees: number;
  availableSpots?: number;
  waitlist?: number;
  attendeeAvatars: string[];
}
