import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventRow from "@/components/EventRow";
import SidebarEventCard from "@/components/SidebarEventCard";

const locations = [
  "All locations",
  "From Munich",
  "From Zurich",
  "From Vienna",
];

const activities = [
  "All activities",
  "Hiking",
  "Climbing",
  "Cycling",
  "Trail Running",
];

// Sample event data organized by date
const eventsByDate = {
  "Tomorrow, Saturday": [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop",
      time: "6:45",
      duration: "3 days",
      title: "Alpine ridge adventure with sunrise views",
      organizer: "Jessica",
      organizerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      departureLocation: "Munich Central Station, platform 29",
      transportMethod: "Train",
      activity: "Hiking",
      difficulty: "T3",
      distance: "18km",
      elevation: "1982m",
      totalHeight: "1800m gain",
      attendees: 12,
      availableSpots: 4,
      attendeeAvatars: [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      ],
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=600&h=400&fit=crop",
      time: "6:45",
      duration: "12 hours",
      title: "Rofan Peak cycling tour",
      organizer: "Helena",
      organizerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      departureLocation: "Munich",
      transportMethod: "Carpool",
      activity: "Cycling",
      difficulty: "T3",
      distance: "18km",
      elevation: "1982m",
      totalHeight: "1800m descent",
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
      title: "Tannheim Valley mountain hike",
      organizer: "John",
      organizerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      departureLocation: "Munich",
      transportMethod: "Bus",
      activity: "Hiking",
      difficulty: "T3",
      distance: "18km",
      elevation: "1982m",
      totalHeight: "2234m gain",
      attendees: 12,
      availableSpots: 4,
      attendeeAvatars: [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      ],
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop",
      time: "8:00",
      duration: "12 days",
      title: "Multi-day alpine crossing adventure",
      organizer: "Freddy",
      organizerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      departureLocation: "Munich Central Station",
      transportMethod: "Self-organised",
      activity: "Hiking",
      difficulty: "T3",
      distance: "18km",
      elevation: "1982m",
      totalHeight: "1800m descent",
      attendees: 20,
      waitlist: 20,
      attendeeAvatars: [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
      ],
    },
  ],
  "Jun 23, Sunday": [
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=600&h=400&fit=crop",
      time: "6:45",
      duration: "12 hours",
      title: "Lakeside trail with panoramic views",
      organizer: "Larissa",
      organizerAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
      departureLocation: "Zurich Central Station",
      transportMethod: "Bus",
      activity: "Hiking",
      difficulty: "T3",
      distance: "18km",
      elevation: "1982m",
      totalHeight: "2234m gain",
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
      title: "Summit challenge to the highest peak",
      organizer: "Laurence",
      organizerAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
      departureLocation: "Munich Main Station",
      transportMethod: "Self-organised",
      activity: "Hiking",
      difficulty: "T3",
      distance: "18km",
      elevation: "1982m",
      totalHeight: "1800m descent",
      attendees: 20,
      waitlist: 20,
      attendeeAvatars: [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      ],
    },
  ],
};

// User's personal events for the sidebar
const userUpcomingEvents = [
  {
    id: 1,
    date: "Jun 30",
    dayOfWeek: "Sat",
    title: "After-work sunset hike to Kampenwand",
    time: "6:45",
    location: "Munich",
    transportMethod: "Train",
    activity: "Cycling",
    difficulty: "Medium",
    distance: "18km",
    elevation: "560m",
    attendeeAvatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    ],
    additionalAttendees: 14,
    organizer: "Jean-Christian",
  },
  {
    id: 2,
    date: "Jun 30",
    dayOfWeek: "Sat",
    title: "Weekend mountain bike adventure",
    time: "6:45",
    location: "Munich",
    transportMethod: "Train",
    activity: "Cycling",
    difficulty: "Medium",
    distance: "18km",
    elevation: "560m",
    attendeeAvatars: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
    ],
    additionalAttendees: 14,
    organizer: "Jean-Christian",
  },
];

const userPastEvents = [
  {
    id: 1,
    date: "Jun 30",
    dayOfWeek: "Sat",
    title: "After-work sunset hike to Kampenwand",
    time: "6:45",
    location: "Munich",
    transportMethod: "Train",
    activity: "Cycling",
    difficulty: "Medium",
    distance: "18km",
    elevation: "560m",
    attendeeAvatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    ],
    additionalAttendees: 14,
    organizer: "Jean-Christian",
    isPast: true,
    images: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&h=200&fit=crop",
    ],
  },
];

type FilterTab = "upcoming" | "location" | "activity";

const Events = () => {
  const [activeTab, setActiveTab] = useState<FilterTab>("upcoming");
  const [selectedLocation, setSelectedLocation] = useState("From Munich");
  const [selectedActivity, setSelectedActivity] = useState("All activities");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Events
            </h1>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 mb-8 border-b border-border">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  activeTab === "upcoming"
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Upcoming events
              </button>
              <button
                onClick={() => setActiveTab("location")}
                className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  activeTab === "location"
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {selectedLocation}
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`flex items-center gap-1 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                      activeTab === "activity"
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {selectedActivity}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {activities.map((activity) => (
                    <DropdownMenuItem
                      key={activity}
                      onClick={() => {
                        setSelectedActivity(activity);
                        setActiveTab("activity");
                      }}
                    >
                      {activity}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Events List */}
            {Object.entries(eventsByDate).map(([dateLabel, events]) => (
              <div key={dateLabel} className="mb-8">
                {/* Date Header */}
                <div className="flex items-baseline gap-8 mb-2">
                  <h2 className="text-lg font-semibold text-foreground">{dateLabel}</h2>
                  <div className="hidden lg:flex items-center gap-8 text-xs text-muted-foreground uppercase tracking-wide">
                    <span className="w-[140px]">Departing from</span>
                    <span className="w-[180px]">Activity</span>
                    <span>Participants</span>
                  </div>
                </div>

                {/* Event Rows */}
                <div>
                  {events.map((event) => (
                    <EventRow key={event.id} {...event} />
                  ))}
                </div>
              </div>
            ))}

            {/* Empty State */}
            {Object.keys(eventsByDate).length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No events found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Try adjusting your filters to find events that match your interests.
                </p>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            {/* Your upcoming events */}
            <div className="bg-muted/30 rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-foreground mb-2">Your upcoming events</h3>
              {userUpcomingEvents.map((event) => (
                <SidebarEventCard key={event.id} {...event} />
              ))}
            </div>

            {/* Your past events */}
            <div className="bg-muted/30 rounded-xl p-4">
              <h3 className="font-semibold text-foreground mb-2">Your past events</h3>
              {userPastEvents.map((event) => (
                <SidebarEventCard key={event.id} {...event} isPast />
              ))}
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Events;
