// Mock profile data for Jack

export interface MockProfile {
  displayName: string;
  age: number;
  location: { city: string; country: string };
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  bio: string;
  stats: {
    yearsHiking: number;
    eventsOrganised: number;
    hikesCompleted: number;
    cyclingActivities: number;
    routesCreated: number;
    viaFerrataActivities: number;
  };
  allTimeStats: {
    hiking: number;
    cycling: number;
    climbing: number;
    viaFerrata: number;
  };
  reviews: number;
  totalDistance: string;
  totalElevation: string;
  difficultyBreakdown: Record<string, number>;
  interests: string[];
  sustainableTravel: boolean;
}

export interface Review {
  content: string;
  reviewerName: string;
  eventName: string;
  date: string;
}

export interface HikingBuddy {
  name: string;
  photo: string;
  hikesTogther: number;
  lastHike: string;
}

export interface FavoriteTrail {
  name: string;
  location: string;
  timesHiked: number;
  image: string;
}

export interface RecentActivity {
  type: 'hike' | 'group' | 'achievement' | 'photo' | 'review';
  title: string;
  description: string;
  timeAgo: string;
  image?: string;
  participants?: { name: string; photo?: string }[];
}

export interface ProfileActivity {
  id: string;
  organizer: { name: string; additionalCount: number };
  title: string;
  time: string;
  location: string;
  transport: string;
  difficulty: string;
  distance: string;
  elevation: string;
  duration: string;
  status: 'organiser' | 'going' | 'available' | 'closed';
}

export const mockProfile: MockProfile = {
  displayName: 'Jack',
  age: 30,
  location: { city: 'Dublin', country: 'Ireland' },
  experienceLevel: 'intermediate',
  bio: 'Outdoor enthusiast who loves exploring the Wicklow Mountains and wild Atlantic coastline. Always up for a challenging hike or a relaxed nature walk with good company!',
  stats: {
    yearsHiking: 3,
    eventsOrganised: 12,
    hikesCompleted: 45,
    cyclingActivities: 8,
    routesCreated: 18,
    viaFerrataActivities: 6,
  },
  allTimeStats: {
    hiking: 45,
    cycling: 8,
    climbing: 3,
    viaFerrata: 6,
  },
  reviews: 28,
  totalDistance: '289km',
  totalElevation: '24,560m',
  difficultyBreakdown: {
    T1: 2,
    T2: 28,
    T3: 18,
    T4: 5,
    T5: 12,
    T6: 2,
  },
  interests: ['Hiking', 'Photography', 'Camping', 'Trail Running'],
  sustainableTravel: true,
};

export const mockReviews: Review[] = [
  {
    content: "Jack is an amazing organiser! The hike was well planned and he made sure everyone was comfortable throughout.",
    reviewerName: "Sarah",
    eventName: "Carrauntoohil Summit",
    date: "Nov 2024"
  },
  {
    content: "Great energy and really knows the trails. Would definitely join his events again!",
    reviewerName: "Marcus",
    eventName: "Glendalough Valley",
    date: "Oct 2024"
  },
  {
    content: "Jack kept the pace perfect for everyone. Really inclusive and fun experience!",
    reviewerName: "Elena",
    eventName: "Bray to Greystones",
    date: "Sep 2024"
  }
];

export const mockHikingBuddies: HikingBuddy[] = [
  {
    name: "Aoife",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    hikesTogther: 12,
    lastHike: "2 days ago"
  },
  {
    name: "Ciaran",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    hikesTogther: 8,
    lastHike: "1 week ago"
  },
  {
    name: "Sinead",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    hikesTogther: 6,
    lastHike: "2 weeks ago"
  },
];

export const mockFavoriteTrails: FavoriteTrail[] = [
  {
    name: "Glendalough",
    location: "Wicklow",
    timesHiked: 8,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=300&h=200&fit=crop"
  },
  {
    name: "Howth Cliff",
    location: "Dublin",
    timesHiked: 12,
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=300&h=200&fit=crop"
  },
  {
    name: "Carrauntoohil",
    location: "Kerry",
    timesHiked: 3,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&h=200&fit=crop"
  },
  {
    name: "Croagh Patrick",
    location: "Mayo",
    timesHiked: 2,
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=300&h=200&fit=crop"
  },
];

export const mockRecentActivity: RecentActivity[] = [
  {
    type: 'hike',
    title: "Completed Bray to Greystones cliff walk",
    description: "7km coastal trail with stunning sea views",
    timeAgo: "2 days ago",
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=100&h=100&fit=crop",
    participants: [
      { name: "Aoife", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
      { name: "Ciaran", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
      { name: "Emma" },
    ]
  },
  {
    type: 'group',
    title: "Joined Wicklow Hikers group",
    description: "Now part of a community of 234 local hikers",
    timeAgo: "5 days ago",
  },
  {
    type: 'achievement',
    title: "Earned 'Peak Bagger' badge",
    description: "Completed 10 summit hikes in Ireland",
    timeAgo: "1 week ago",
  },
  {
    type: 'photo',
    title: "Shared 5 photos from Glendalough",
    description: "Your photos got 23 likes from the community",
    timeAgo: "1 week ago",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=100&h=100&fit=crop"
  },
  {
    type: 'review',
    title: "Left a review for Sarah",
    description: "Rated 5 stars for the Wicklow Way hike",
    timeAgo: "2 weeks ago",
  },
];

export const mockActivities: ProfileActivity[] = [
  {
    id: '1',
    organizer: { name: "Jack", additionalCount: 8 },
    title: "Carrauntoohil sunrise hike",
    time: "5:30",
    location: "Dublin",
    transport: "Car",
    difficulty: "T3",
    distance: "14km",
    elevation: "1040m",
    duration: "6h",
    status: 'organiser',
  },
  {
    id: '2',
    organizer: { name: "Lisa", additionalCount: 12 },
    title: "Wicklow Way scenic trail",
    time: "8:00",
    location: "Dublin",
    transport: "Bus",
    difficulty: "T2",
    distance: "12km",
    elevation: "450m",
    duration: "4h",
    status: 'going',
  },
];
