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
import { useEvents, useUserEvents } from "@/hooks/useEvents";
import { locations, activities } from "@/data/events";
import { getEmptyStateCopy } from "@/lib/emptyStates";

type FilterTab = "upcoming" | "location" | "activity";

const Events = () => {
  const [activeTab, setActiveTab] = useState<FilterTab>("upcoming");
  const [selectedLocation, setSelectedLocation] = useState("From Dublin");
  const [selectedActivity, setSelectedActivity] = useState("All activities");

  const { eventsByDate, isLoading, error } = useEvents();
  const { upcoming: userUpcomingEvents, past: userPastEvents, isLoading: userEventsLoading } = useUserEvents();

  const emptyState = getEmptyStateCopy('events');

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-destructive" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {error.message}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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

            {/* Loading State */}
            {isLoading && (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-6 w-32 bg-muted rounded mb-2" />
                    <div className="h-20 bg-muted rounded" />
                  </div>
                ))}
              </div>
            )}

            {/* Events List */}
            {!isLoading && Object.entries(eventsByDate).map(([dateLabel, events]) => (
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
            {!isLoading && Object.keys(eventsByDate).length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{emptyState.title}</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {emptyState.message}
                </p>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            {/* Your upcoming events */}
            <div className="bg-muted/30 rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-foreground mb-2">Your upcoming events</h3>
              {userEventsLoading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-24 bg-muted rounded" />
                  <div className="h-24 bg-muted rounded" />
                </div>
              ) : (
                userUpcomingEvents.map((event) => (
                  <SidebarEventCard key={event.id} {...event} />
                ))
              )}
            </div>

            {/* Your past events */}
            <div className="bg-muted/30 rounded-xl p-4">
              <h3 className="font-semibold text-foreground mb-2">Your past events</h3>
              {userEventsLoading ? (
                <div className="animate-pulse">
                  <div className="h-24 bg-muted rounded" />
                </div>
              ) : (
                userPastEvents.map((event) => (
                  <SidebarEventCard key={event.id} {...event} isPast />
                ))
              )}
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Events;
