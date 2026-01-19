import type { Event, SidebarEvent, EventRow } from '@/types/event';

// Filter options for the events page
export const locations = [
  "All locations",
  "From Dublin",
  "From Cork",
  "From Galway",
];

export const activities = [
  "All activities",
  "Hiking",
  "Climbing",
  "Cycling",
  "Trail Running",
];

// Event list data (for EventRow display)
export const eventRows: EventRow[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop",
    time: "6:45",
    duration: "3 days",
    title: "Carrauntoohil summit adventure",
    organizer: "Jessica",
    organizerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    departureLocation: "Dublin Heuston Station",
    transportMethod: "Train",
    activity: "Hiking",
    difficulty: "T3",
    distance: "18km",
    elevation: "1040m",
    totalHeight: "1040m gain",
    attendees: 12,
    availableSpots: 4,
    attendeeAvatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    ],
    routeId: "carrauntoohil",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=600&h=400&fit=crop",
    time: "6:45",
    duration: "12 hours",
    title: "Ring of Kerry coastal cycle",
    organizer: "Helena",
    organizerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    departureLocation: "Dublin",
    transportMethod: "Carpool",
    activity: "Cycling",
    difficulty: "T3",
    distance: "45km",
    elevation: "680m",
    totalHeight: "680m gain",
    attendees: 20,
    waitlist: 20,
    attendeeAvatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
    ],
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=400&fit=crop",
    time: "6:45",
    duration: "1 day",
    title: "Glendalough Valley loop",
    organizer: "John",
    organizerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    departureLocation: "Dublin",
    transportMethod: "Bus",
    activity: "Hiking",
    difficulty: "T2",
    distance: "14km",
    elevation: "450m",
    totalHeight: "450m gain",
    attendees: 12,
    availableSpots: 4,
    attendeeAvatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    ],
    routeId: "glendalough-spinc",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop",
    time: "8:00",
    duration: "5 days",
    title: "Wild Atlantic Way multi-day trek",
    organizer: "Freddy",
    organizerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    departureLocation: "Dublin City Centre",
    transportMethod: "Self-organised",
    activity: "Hiking",
    difficulty: "T4",
    distance: "85km",
    elevation: "2100m",
    totalHeight: "2100m total",
    attendees: 20,
    waitlist: 20,
    attendeeAvatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
    ],
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=600&h=400&fit=crop",
    time: "6:45",
    duration: "8 hours",
    title: "Cliffs of Moher coastal walk",
    organizer: "Larissa",
    organizerAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
    departureLocation: "Galway Bus Station",
    transportMethod: "Bus",
    activity: "Hiking",
    difficulty: "T2",
    distance: "16km",
    elevation: "320m",
    totalHeight: "320m gain",
    attendees: 12,
    availableSpots: 4,
    attendeeAvatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    ],
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=600&h=400&fit=crop",
    time: "6:45",
    duration: "1 day",
    title: "Croagh Patrick pilgrimage hike",
    organizer: "Laurence",
    organizerAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    departureLocation: "Dublin Connolly Station",
    transportMethod: "Self-organised",
    activity: "Hiking",
    difficulty: "T3",
    distance: "7km",
    elevation: "764m",
    totalHeight: "764m gain",
    attendees: 20,
    waitlist: 20,
    attendeeAvatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    ],
    routeId: "croagh-patrick",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    time: "9:00",
    duration: "3 hours",
    title: "Bray to Greystones cliff walk",
    organizer: "Aoife",
    organizerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    departureLocation: "Bray DART Station",
    transportMethod: "DART",
    activity: "Hiking",
    difficulty: "T1",
    distance: "6km",
    elevation: "120m",
    totalHeight: "120m gain",
    attendees: 16,
    availableSpots: 4,
    attendeeAvatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    ],
    routeId: "bray-greystones",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=600&h=400&fit=crop",
    time: "10:00",
    duration: "3 hours",
    title: "Howth Head loop trail",
    organizer: "Ciaran",
    organizerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    departureLocation: "Howth DART Station",
    transportMethod: "DART",
    activity: "Hiking",
    difficulty: "T2",
    distance: "11km",
    elevation: "280m",
    totalHeight: "280m gain",
    attendees: 10,
    availableSpots: 6,
    attendeeAvatars: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    ],
    routeId: "howth-head",
  },
];

// Group events by date label
export function getEventsByDate(): Record<string, EventRow[]> {
  return {
    "Tomorrow, Saturday": eventRows.slice(0, 4),
    "Jun 23, Sunday": eventRows.slice(4, 6),
  };
}

// User's personal events for the sidebar
export const userUpcomingEvents: SidebarEvent[] = [
  {
    id: 1,
    date: "Jun 30",
    dayOfWeek: "Sat",
    title: "Bray to Greystones cliff walk",
    time: "9:00",
    location: "Dublin",
    transportMethod: "DART",
    activity: "Hiking",
    difficulty: "Easy",
    distance: "7km",
    elevation: "120m",
    attendeeAvatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    ],
    additionalAttendees: 14,
    organizer: "Aoife",
  },
  {
    id: 2,
    date: "Jul 6",
    dayOfWeek: "Sat",
    title: "Howth Head loop trail",
    time: "10:00",
    location: "Dublin",
    transportMethod: "DART",
    activity: "Hiking",
    difficulty: "Medium",
    distance: "11km",
    elevation: "280m",
    attendeeAvatars: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
    ],
    additionalAttendees: 8,
    organizer: "Ciaran",
  },
];

export const userPastEvents: SidebarEvent[] = [
  {
    id: 1,
    date: "Jun 15",
    dayOfWeek: "Sat",
    title: "Wicklow Mountains sunrise hike",
    time: "5:30",
    location: "Dublin",
    transportMethod: "Carpool",
    activity: "Hiking",
    difficulty: "Medium",
    distance: "15km",
    elevation: "560m",
    attendeeAvatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    ],
    additionalAttendees: 10,
    organizer: "Sinead",
    isPast: true,
    images: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&h=200&fit=crop",
    ],
  },
];

// Full event details (for EventDetail page)
export const events: Event[] = [
  {
    id: '1',
    title: 'Carrauntoohil sunrise hike',
    description: "Experience the magic of watching the sunrise from Ireland's highest peak! We'll start early to reach the summit just as the first rays of light paint the MacGillycuddy's Reeks in golden hues. This is a challenging hike suitable for those with mountain hiking experience.",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop",
    date: 'Saturday, January 11, 2025',
    dateLabel: 'Tomorrow, Saturday',
    time: '5:30 AM',
    duration: '6h',
    meetingPoint: 'Dublin Heuston Station, Platform 4',
    location: 'Carrauntoohil, County Kerry',
    departureLocation: 'Dublin Heuston Station',
    routeId: 'carrauntoohil',
    transport: 'Car',
    activity: 'Hiking',
    difficulty: 'T3',
    distance: '14km',
    elevation: '1040m',
    maxParticipants: 12,
    currentParticipants: 9,
    availableSpots: 3,
    status: 'organiser',
    organizer: {
      name: 'Jack',
      rating: 4.9,
      eventsOrganised: 12,
    },
    participants: [
      { name: 'Sarah' },
      { name: 'Marcus' },
      { name: 'Elena' },
      { name: 'Tom' },
      { name: 'Lisa' },
      { name: 'Alex' },
      { name: 'Maria' },
      { name: 'Ben' },
      { name: 'Sophie' },
    ],
    attendeeAvatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
    ],
    requirements: [
      'Good fitness level',
      'Previous mountain hiking experience required',
      'Headlamp required for early start',
      'Waterproof layers essential'
    ],
    whatToBring: [
      'Hiking boots with good ankle support',
      'Headlamp with spare batteries',
      'Waterproof jacket and trousers',
      '2L water minimum',
      'Snacks and packed breakfast',
      'Warm hat and gloves',
      'First aid kit',
      'Trekking poles (recommended)'
    ],
    weather: {
      condition: 'Partly cloudy',
      temp: '4°C to 12°C',
      wind: '20 km/h',
      humidity: '75%'
    },
    route: {
      highlights: [
        'Spectacular sunrise views over Kerry',
        "Summit of Ireland's highest peak (1,039m)",
        'Views of the Lakes of Killarney',
        'Wild Atlantic coastline visible on clear days'
      ],
      warnings: [
        'Early start required - meet at 5:30 AM sharp',
        'Summit can be very exposed and windy',
        'Weather changes quickly - be prepared for rain'
      ]
    }
  },
  {
    id: '2',
    title: 'Wicklow Way scenic trail',
    description: 'A beautiful section of the famous Wicklow Way with stunning views of Glendalough and the surrounding valleys. Perfect for a day out with fellow hiking enthusiasts!',
    image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=400&fit=crop",
    date: 'Sunday, January 12, 2025',
    dateLabel: 'Jan 12, Sunday',
    time: '8:00 AM',
    duration: '4h',
    meetingPoint: 'Dublin Connolly Station, DART Platform',
    location: 'Wicklow Mountains, County Wicklow',
    departureLocation: 'Dublin Connolly Station',
    routeId: 'glendalough-spinc',
    transport: 'Bus',
    activity: 'Hiking',
    difficulty: 'T2',
    distance: '12km',
    elevation: '450m',
    maxParticipants: 15,
    currentParticipants: 13,
    availableSpots: 2,
    status: 'going',
    organizer: {
      name: 'Lisa',
      rating: 4.8,
      eventsOrganised: 24,
    },
    participants: [
      { name: 'Jack' },
      { name: 'Emma' },
      { name: 'David' },
      { name: 'Anna' },
      { name: 'Chris' },
      { name: 'Julia' },
      { name: 'Max' },
      { name: 'Nina' },
      { name: 'Felix' },
      { name: 'Laura' },
      { name: 'Tim' },
      { name: 'Mia' },
    ],
    attendeeAvatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    ],
    requirements: [
      'Basic fitness level',
      'Suitable for hiking beginners with guidance'
    ],
    whatToBring: [
      'Comfortable hiking shoes',
      'Waterproof jacket',
      '1.5L water',
      'Lunch and snacks',
      'Small backpack'
    ],
    weather: {
      condition: 'Partly cloudy',
      temp: '8°C to 14°C',
      wind: '15 km/h',
      humidity: '70%'
    },
    route: {
      highlights: [
        'Views of Glendalough monastic site',
        'Ancient oak woodlands',
        'Cosy pub stop in Roundwood village'
      ],
      warnings: [
        'Trail can be muddy after rain - wear waterproof boots'
      ]
    }
  },
  {
    id: '3',
    title: 'Glendalough Valley loop',
    description: 'Explore the magical Glendalough valley with its ancient monastic ruins and serene lakes. This moderate loop takes you through the Spinc ridge with breathtaking views of the Upper and Lower Lakes.',
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    date: 'Saturday, January 18, 2025',
    dateLabel: 'Jan 18, Saturday',
    time: '9:00 AM',
    duration: '4h',
    meetingPoint: 'Glendalough Visitor Centre Car Park',
    location: 'Glendalough, County Wicklow',
    departureLocation: 'Dublin',
    routeId: 'glendalough-spinc',
    transport: 'Bus',
    activity: 'Hiking',
    difficulty: 'T2',
    distance: '9km',
    elevation: '380m',
    maxParticipants: 12,
    currentParticipants: 8,
    availableSpots: 4,
    status: 'going',
    organizer: {
      name: 'John',
      rating: 4.7,
      eventsOrganised: 18,
    },
    participants: [
      { name: 'Sarah' },
      { name: 'Mike' },
      { name: 'Emma' },
      { name: 'David' },
      { name: 'Anna' },
      { name: 'Chris' },
      { name: 'Julia' },
      { name: 'Max' },
    ],
    attendeeAvatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    ],
    requirements: [
      'Moderate fitness level',
      'Suitable for those with some hiking experience'
    ],
    whatToBring: [
      'Sturdy hiking boots',
      'Waterproof jacket',
      '1.5L water',
      'Packed lunch',
      'Camera for scenic photos'
    ],
    weather: {
      condition: 'Sunny intervals',
      temp: '6°C to 11°C',
      wind: '12 km/h',
      humidity: '65%'
    },
    route: {
      highlights: [
        'Spinc ridge panoramic views',
        'Upper and Lower Lakes',
        'Ancient monastic settlement',
        'Poulanass Waterfall'
      ],
      warnings: [
        'Some steep sections on the Spinc',
        'Can be slippery when wet'
      ]
    }
  },
  {
    id: '7',
    title: 'Bray to Greystones cliff walk',
    description: 'A stunning coastal walk along the dramatic cliffs between Bray and Greystones. This scenic trail offers breathtaking views of the Irish Sea and is easily accessible by DART, making it perfect for a morning or afternoon adventure.',
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    date: 'Saturday, February 1, 2025',
    dateLabel: 'Feb 1, Saturday',
    time: '9:00 AM',
    duration: '3h',
    meetingPoint: 'Bray DART Station, main entrance',
    location: 'Bray to Greystones, County Wicklow',
    departureLocation: 'Bray DART Station',
    routeId: 'bray-greystones',
    transport: 'DART',
    activity: 'Hiking',
    difficulty: 'T1',
    distance: '6km',
    elevation: '120m',
    maxParticipants: 20,
    currentParticipants: 16,
    availableSpots: 4,
    status: 'going',
    organizer: {
      name: 'Aoife',
      rating: 4.9,
      eventsOrganised: 28,
    },
    participants: [
      { name: 'Jack' },
      { name: 'Sarah' },
      { name: 'Marcus' },
      { name: 'Elena' },
      { name: 'Tom' },
      { name: 'Lisa' },
      { name: 'Alex' },
      { name: 'Maria' },
      { name: 'Ben' },
      { name: 'Sophie' },
      { name: 'David' },
      { name: 'Emma' },
      { name: 'Chris' },
      { name: 'Julia' },
      { name: 'Max' },
      { name: 'Nina' },
    ],
    attendeeAvatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
    ],
    requirements: [
      'Basic fitness level - suitable for beginners',
      'Comfortable with heights (cliff edge path)'
    ],
    whatToBring: [
      'Comfortable walking shoes',
      'Waterproof jacket',
      '1L water',
      'Snacks',
      'Camera for coastal views'
    ],
    weather: {
      condition: 'Sunny',
      temp: '10°C to 14°C',
      wind: '18 km/h',
      humidity: '60%'
    },
    route: {
      highlights: [
        'Dramatic cliff views over the Irish Sea',
        'Easy DART access from Dublin',
        'Café stop in Greystones',
        'Wildlife spotting opportunities'
      ],
      warnings: [
        'Stay on marked path - cliff edges can be unstable',
        'Can be windy - bring layers'
      ]
    }
  },
  {
    id: '8',
    title: 'Howth Head loop trail',
    description: 'Explore the beautiful Howth peninsula with its rugged cliffs, heather-covered hills, and stunning views of Dublin Bay. This loop trail takes you around the headland with stops at the historic Baily Lighthouse viewpoint.',
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=600&h=400&fit=crop",
    date: 'Sunday, February 2, 2025',
    dateLabel: 'Feb 2, Sunday',
    time: '10:00 AM',
    duration: '3.5h',
    meetingPoint: 'Howth DART Station, outside main entrance',
    location: 'Howth Head, County Dublin',
    departureLocation: 'Howth DART Station',
    routeId: 'howth-head',
    transport: 'DART',
    activity: 'Hiking',
    difficulty: 'T2',
    distance: '11km',
    elevation: '280m',
    maxParticipants: 16,
    currentParticipants: 10,
    availableSpots: 6,
    status: 'available',
    organizer: {
      name: 'Ciaran',
      rating: 4.8,
      eventsOrganised: 15,
    },
    participants: [
      { name: 'Sarah' },
      { name: 'Marcus' },
      { name: 'Elena' },
      { name: 'Tom' },
      { name: 'Lisa' },
      { name: 'Alex' },
      { name: 'Maria' },
      { name: 'Ben' },
      { name: 'Sophie' },
      { name: 'David' },
    ],
    attendeeAvatars: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    ],
    requirements: [
      'Moderate fitness level',
      'Some hiking experience preferred'
    ],
    whatToBring: [
      'Hiking boots or sturdy shoes',
      'Waterproof jacket',
      '1.5L water',
      'Packed lunch',
      'Binoculars for wildlife'
    ],
    weather: {
      condition: 'Partly cloudy',
      temp: '8°C to 12°C',
      wind: '22 km/h',
      humidity: '68%'
    },
    route: {
      highlights: [
        'Baily Lighthouse viewpoint',
        'Dublin Bay panoramas',
        'Seabird colonies',
        'Fresh seafood lunch in Howth village'
      ],
      warnings: [
        'Exposed sections can be very windy',
        'Some steep climbs'
      ]
    }
  },
];

// Helper to get event by ID
export function getEventById(id: string): Event | undefined {
  return events.find(event => event.id === id);
}
