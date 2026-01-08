export interface HikingRoute {
  id: string;
  name: string;
  thumbnail: string;
  distance: number; // in km
  duration: number; // in minutes
  difficulty: 'easy' | 'moderate' | 'hard';
  technicality: 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'T6';
  highlights: string[];
  features: string[];
  facilities: string[];
  accessibility: string[];
  routeType: 'loop' | 'out-back' | 'point-to-point';
  season: 'summer' | 'winter' | 'all-year';
  location: string;
  description: string;
}

export const irishRoutes: HikingRoute[] = [
  {
    id: 'carrauntoohil',
    name: 'Carrauntoohil via Devil\'s Ladder',
    thumbnail: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&q=80',
    distance: 13,
    duration: 360,
    difficulty: 'hard',
    technicality: 'T3',
    highlights: ['Lake', 'Ridge', 'Summit'],
    features: ['Ridges', 'Climbing'],
    facilities: ['Parking'],
    accessibility: [],
    routeType: 'out-back',
    season: 'summer',
    location: 'Kerry',
    description: 'Ireland\'s highest peak with stunning views of the MacGillycuddy\'s Reeks.'
  },
  {
    id: 'glendalough-spinc',
    name: 'Glendalough Spinc & Glenealo Valley',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    distance: 9,
    duration: 240,
    difficulty: 'moderate',
    technicality: 'T2',
    highlights: ['Lake', 'Waterfall', 'Historical'],
    features: ['Avoid Roads'],
    facilities: ['Parking', 'Toilets', 'Restaurant'],
    accessibility: ['Kid-friendly'],
    routeType: 'loop',
    season: 'all-year',
    location: 'Wicklow',
    description: 'A classic Wicklow loop with ancient monastic ruins and glacial lakes.'
  },
  {
    id: 'bray-greystones',
    name: 'Bray to Greystones Cliff Walk',
    thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
    distance: 6,
    duration: 120,
    difficulty: 'easy',
    technicality: 'T1',
    highlights: ['Coastline', 'Historical'],
    features: [],
    facilities: ['Parking', 'Restaurant', 'Public Transport', 'Toilets'],
    accessibility: ['Kid-friendly', 'Dog-friendly'],
    routeType: 'point-to-point',
    season: 'all-year',
    location: 'Wicklow',
    description: 'A stunning coastal walk with panoramic Irish Sea views.'
  },
  {
    id: 'diamond-hill',
    name: 'Diamond Hill Loop',
    thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    distance: 7,
    duration: 180,
    difficulty: 'moderate',
    technicality: 'T2',
    highlights: ['Coastline', 'Lake'],
    features: [],
    facilities: ['Parking', 'Toilets'],
    accessibility: ['Kid-friendly'],
    routeType: 'loop',
    season: 'all-year',
    location: 'Galway',
    description: 'Connemara\'s most popular peak with views over Twelve Bens and the Atlantic.'
  },
  {
    id: 'croagh-patrick',
    name: 'Croagh Patrick Pilgrimage',
    thumbnail: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    distance: 7,
    duration: 210,
    difficulty: 'moderate',
    technicality: 'T2',
    highlights: ['Historical', 'Coastline'],
    features: [],
    facilities: ['Parking', 'Restaurant'],
    accessibility: [],
    routeType: 'out-back',
    season: 'all-year',
    location: 'Mayo',
    description: 'Ireland\'s holy mountain with sweeping views of Clew Bay.'
  },
  {
    id: 'slieve-league',
    name: 'Slieve League Cliffs',
    thumbnail: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=800&q=80',
    distance: 10,
    duration: 240,
    difficulty: 'hard',
    technicality: 'T3',
    highlights: ['Coastline', 'Ridge'],
    features: ['Ridges'],
    facilities: ['Parking'],
    accessibility: [],
    routeType: 'out-back',
    season: 'summer',
    location: 'Donegal',
    description: 'Among Europe\'s highest sea cliffs with dramatic Atlantic views.'
  },
  {
    id: 'torc-mountain',
    name: 'Torc Mountain & Waterfall',
    thumbnail: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80',
    distance: 5,
    duration: 150,
    difficulty: 'easy',
    technicality: 'T1',
    highlights: ['Waterfall', 'Lake'],
    features: [],
    facilities: ['Parking', 'Toilets'],
    accessibility: ['Kid-friendly', 'Dog-friendly'],
    routeType: 'loop',
    season: 'all-year',
    location: 'Kerry',
    description: 'A gentle climb to views over Killarney\'s lakes with a beautiful waterfall stop.'
  },
  {
    id: 'mourne-wall',
    name: 'Mourne Wall Challenge',
    thumbnail: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80',
    distance: 35,
    duration: 600,
    difficulty: 'hard',
    technicality: 'T4',
    highlights: ['Ridge', 'Summit'],
    features: ['Ridges', 'Climbing'],
    facilities: ['Parking'],
    accessibility: [],
    routeType: 'loop',
    season: 'summer',
    location: 'Down',
    description: 'An epic traverse following the historic dry-stone wall over 15 summits.'
  },
  {
    id: 'glenveagh',
    name: 'Glenveagh National Park Trail',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    distance: 8,
    duration: 180,
    difficulty: 'easy',
    technicality: 'T1',
    highlights: ['Lake', 'Historical'],
    features: ['Avoid Roads'],
    facilities: ['Parking', 'Restaurant', 'Toilets'],
    accessibility: ['Kid-friendly', 'Dog-friendly', 'Wheelchair-friendly'],
    routeType: 'out-back',
    season: 'all-year',
    location: 'Donegal',
    description: 'A serene walk through ancient oakwoods to Glenveagh Castle.'
  },
  {
    id: 'errigal',
    name: 'Errigal Mountain',
    thumbnail: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&q=80',
    distance: 5,
    duration: 180,
    difficulty: 'moderate',
    technicality: 'T3',
    highlights: ['Summit', 'Ridge'],
    features: ['Ridges'],
    facilities: ['Parking'],
    accessibility: [],
    routeType: 'out-back',
    season: 'all-year',
    location: 'Donegal',
    description: 'Donegal\'s iconic quartzite peak with dramatic scree slopes.'
  },
  {
    id: 'cliffs-moher',
    name: 'Cliffs of Moher Coastal Walk',
    thumbnail: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800&q=80',
    distance: 18,
    duration: 300,
    difficulty: 'moderate',
    technicality: 'T2',
    highlights: ['Coastline', 'Historical'],
    features: [],
    facilities: ['Parking', 'Restaurant', 'Toilets'],
    accessibility: ['Dog-friendly'],
    routeType: 'point-to-point',
    season: 'all-year',
    location: 'Clare',
    description: 'Ireland\'s most famous coastal scenery along the Wild Atlantic Way.'
  },
  {
    id: 'powerscourt-waterfall',
    name: 'Powerscourt Waterfall Loop',
    thumbnail: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=80',
    distance: 4,
    duration: 90,
    difficulty: 'easy',
    technicality: 'T1',
    highlights: ['Waterfall', 'River'],
    features: [],
    facilities: ['Parking', 'Toilets'],
    accessibility: ['Kid-friendly', 'Dog-friendly'],
    routeType: 'loop',
    season: 'all-year',
    location: 'Wicklow',
    description: 'A gentle woodland walk to Ireland\'s highest waterfall.'
  }
];

export const filterOptions = {
  difficulty: ['easy', 'moderate', 'hard'] as const,
  technicality: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'] as const,
  duration: [
    { label: 'Under 1h', min: 0, max: 60 },
    { label: '1–3h', min: 60, max: 180 },
    { label: '3–6h', min: 180, max: 360 },
    { label: '6+ h', min: 360, max: Infinity }
  ],
  features: ['Via Ferrata', 'Ridges', 'Climbing', 'Avoid Roads'],
  highlights: ['Lake', 'River', 'Coastline', 'Historical', 'Waterfall', 'Summit', 'Ridge'],
  facilities: ['Restaurant', 'Mountain hut', 'Toilets', 'Parking', 'Public Transport'],
  accessibility: ['Kid-friendly', 'Dog-friendly', 'Wheelchair-friendly'],
  routeType: ['loop', 'out-back', 'point-to-point'] as const,
  season: ['summer', 'winter', 'all-year'] as const
};
