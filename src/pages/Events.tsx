import { useState } from "react";
import { Search, MapPin, Calendar, Filter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";

const locations = [
  "All locations",
  "Munich, Germany",
  "Zurich, Switzerland",
  "Geneva, Switzerland",
  "Vienna, Austria",
  "Milan, Italy",
  "Barcelona, Spain",
];

const activities = [
  "All activities",
  "Hiking",
  "Climbing",
  "Cycling",
  "Trail Running",
  "Kayaking",
  "Skiing",
];

const upcomingEvents = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop",
    date: "Mar 15",
    title: "Sunrise Hike to Zugspitze",
    organizer: "Alpine Explorers",
    rating: 4.9,
    attendees: 24,
    attendeeAvatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
    ],
    location: "Munich, Germany",
    activity: "Hiking",
    featured: true,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=600&h=400&fit=crop",
    date: "Mar 18",
    title: "Rock Climbing Weekend",
    organizer: "Summit Seekers",
    rating: 4.8,
    attendees: 12,
    attendeeAvatars: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    ],
    location: "Zurich, Switzerland",
    activity: "Climbing",
    featured: true,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=600&h=400&fit=crop",
    date: "Mar 20",
    title: "Mountain Bike Trail Adventure",
    organizer: "Trail Blazers",
    rating: 4.7,
    attendees: 18,
    attendeeAvatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
    ],
    location: "Geneva, Switzerland",
    activity: "Cycling",
    featured: false,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=400&fit=crop",
    date: "Mar 22",
    title: "Dolomites Day Hike",
    organizer: "Mountain Friends",
    rating: 4.9,
    attendees: 30,
    attendeeAvatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    ],
    location: "Milan, Italy",
    activity: "Hiking",
    soldOut: true,
    featured: false,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop",
    date: "Mar 25",
    title: "Alpine Trail Running",
    organizer: "Run Wild Club",
    rating: 4.6,
    attendees: 15,
    attendeeAvatars: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    ],
    location: "Vienna, Austria",
    activity: "Trail Running",
    featured: false,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=600&h=400&fit=crop",
    date: "Mar 28",
    title: "Lake Kayaking Experience",
    organizer: "Water Adventures",
    rating: 4.8,
    attendees: 8,
    attendeeAvatars: [
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    ],
    location: "Geneva, Switzerland",
    activity: "Kayaking",
    featured: false,
  },
];

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All locations");
  const [selectedActivity, setSelectedActivity] = useState("All activities");

  const filteredEvents = upcomingEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation =
      selectedLocation === "All locations" || event.location === selectedLocation;
    const matchesActivity =
      selectedActivity === "All activities" || event.activity === selectedActivity;
    return matchesSearch && matchesLocation && matchesActivity;
  });

  const featuredEvents = filteredEvents.filter((e) => e.featured);
  const regularEvents = filteredEvents.filter((e) => !e.featured);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-12 md:py-16">
          <div className="container max-w-6xl mx-auto px-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
              Discover Events
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mb-8">
              Find your next adventure. Join upcoming hikes, climbs, and outdoor experiences with fellow enthusiasts.
            </p>

            {/* Search and Filters */}
            <div className="bg-card rounded-2xl shadow-lg p-4 md:p-6 border border-border">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search events, organizers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-base"
                  />
                </div>

                {/* Location Filter */}
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-full md:w-[200px] h-12">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Activity Filter */}
                <Select value={selectedActivity} onValueChange={setSelectedActivity}>
                  <SelectTrigger className="w-full md:w-[180px] h-12">
                    <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Activity" />
                  </SelectTrigger>
                  <SelectContent>
                    {activities.map((activity) => (
                      <SelectItem key={activity} value={activity}>
                        {activity}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container max-w-6xl mx-auto px-6">
              <div className="flex items-center gap-3 mb-8">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                  Featured
                </span>
                <h2 className="text-2xl font-bold">Recommended for you</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {featuredEvents.map((event) => (
                  <EventCard key={event.id} {...event} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Events */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">
                Upcoming Events
                <span className="ml-2 text-muted-foreground font-normal text-lg">
                  ({filteredEvents.length})
                </span>
              </h2>
            </div>

            {filteredEvents.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(regularEvents.length > 0 ? regularEvents : filteredEvents).map((event) => (
                  <EventCard key={event.id} {...event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No events found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Try adjusting your filters or search query to find events that match your interests.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20">
          <div className="container max-w-6xl mx-auto px-6">
            <div className="bg-primary rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Can't find the perfect event?
              </h2>
              <p className="text-primary-foreground/80 max-w-lg mx-auto mb-6">
                Create your own adventure and invite others to join. It's easy and free!
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="font-semibold"
              >
                Create an Event
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Events;
