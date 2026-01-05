export interface UserProfile {
  id: string;
  displayName: string;
  photoUrl?: string;
  location: {
    city: string;
    country: string;
  };
  interests: string[];
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  preferredHikeTypes: string[];
  pace: 'slow' | 'moderate' | 'fast';
  bio: string;
  isPublic: boolean;
  stats: {
    eventsJoined: number;
    routesCompleted: number;
    followers: number;
    following: number;
  };
  createdAt: string;
}

export const OUTDOOR_INTERESTS = [
  'Hiking',
  'Climbing',
  'Cycling',
  'Water Sports',
  'Camping',
  'Trail Running',
  'Skiing',
  'Photography'
];

export const HIKE_TYPES = [
  'Coastal',
  'Alpine',
  'Forest',
  'Desert',
  'Multi-day',
  'Urban',
  'Lakeside',
  'Mountain'
];

export const EXPERIENCE_LEVELS = [
  { value: 'beginner', label: 'Beginner', description: 'New to hiking' },
  { value: 'intermediate', label: 'Intermediate', description: '1-3 years experience' },
  { value: 'advanced', label: 'Advanced', description: '3+ years, technical trails' }
] as const;

export const PACE_OPTIONS = [
  { value: 'slow', label: 'Slow', description: 'Enjoy the journey' },
  { value: 'moderate', label: 'Moderate', description: 'Steady pace' },
  { value: 'fast', label: 'Fast', description: 'Challenge myself' }
] as const;
