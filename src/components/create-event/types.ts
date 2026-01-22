export type ActivityType = 'hiking' | 'cycling' | 'climbing' | 'skiing' | 'bouldering' | 'social';

export interface CreateEventFormData {
  activityType: ActivityType | null;
  routeId: string | null;
  date: Date | null;
  time: string;
  eventName: string;
  maxParticipants: number | null;
}

export const ACTIVITIES_WITH_ROUTE: ActivityType[] = ['hiking', 'cycling', 'climbing'];

export const ACTIVITY_OPTIONS: { type: ActivityType; label: string }[] = [
  { type: 'hiking', label: 'Hiking' },
  { type: 'cycling', label: 'Cycling' },
  { type: 'climbing', label: 'Climbing' },
  { type: 'skiing', label: 'Skiing' },
  { type: 'bouldering', label: 'Bouldering' },
  { type: 'social', label: 'Social' },
];

export const STORAGE_KEY = 'create-event-draft';
