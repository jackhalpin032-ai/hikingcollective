import { ChevronRight } from "lucide-react";
import EventCard from "./EventCard";

const events = [
  {
    image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=400&h=300&fit=crop",
    date: "Tue, Jan 13, 2026 · 4:45 PM CET",
    title: "Munich Co-Founder Matching / Find your Co-Founder",
    organizer: "Munich Co-Founder Matching / Fin...",
    rating: 4.6,
    attendees: 62,
    attendeeAvatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop",
    date: "Tue, Jan 13, 2026 · 6:00 PM CET",
    title: "Entrepreneur Meetup — Unternehmertreffen in München",
    organizer: "Munich's Entrepreneurs",
    rating: 4.5,
    attendees: 76,
    attendeeAvatars: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop",
    date: "Wed, Jan 7, 2026 · 6:00 PM CET",
    title: "AI Product Managers' Work & Wine Session",
    organizer: "Becoming AI Product Manager Gro...",
    rating: 4.4,
    attendees: 6,
    soldOut: true,
    attendeeAvatars: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=300&fit=crop",
    date: "Fri, Jan 9, 2026 · 7:00 PM CET",
    title: "Munich Bar Crawl",
    organizer: "The Munich Connection",
    rating: 4.8,
    attendees: 37,
    attendeeAvatars: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    ],
  },
];

const EventsSection = () => {
  return (
    <section className="py-12 bg-muted/50" id="events">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold">Upcoming events</h2>
        </div>

        {/* Events carousel */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {events.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>

          {/* Next button */}
          <button className="absolute right-0 top-1/3 -translate-y-1/2 p-2 bg-background shadow-lg rounded-full hover:bg-muted transition-colors hidden md:block">
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Explore link */}
        <div className="flex justify-end mt-6">
          <a
            href="#"
            className="text-sm font-medium text-primary hover:underline underline-offset-4"
          >
            Explore more routes
          </a>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
