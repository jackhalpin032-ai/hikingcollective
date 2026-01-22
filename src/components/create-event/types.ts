export type ActivityType = 'hiking' | 'cycling' | 'via-ferrata' | 'skiing' | 'bouldering' | 'social';

export interface CreateEventFormData {
  activityType: ActivityType | null;
  routeId: string | null;
  date: Date | null;
  time: string;
  eventName: string;
  maxParticipants: number | null;
}

export const ACTIVITIES_WITH_ROUTE: ActivityType[] = ['hiking', 'cycling', 'via-ferrata'];

export const ACTIVITY_OPTIONS: { type: ActivityType; label: string; icon: string }[] = [
  { type: 'hiking', label: 'Hiking', icon: 'fa-person-hiking' },
  { type: 'cycling', label: 'Cycling', icon: 'fa-bicycle' },
  { type: 'via-ferrata', label: 'Via Ferrata', icon: 'fa-mountain' },
  { type: 'skiing', label: 'Skiing', icon: 'fa-person-skiing' },
  { type: 'bouldering', label: 'Bouldering', icon: 'fa-hands' },
  { type: 'social', label: 'Social', icon: 'fa-users' },
];

export const STORAGE_KEY = 'create-event-draft';
