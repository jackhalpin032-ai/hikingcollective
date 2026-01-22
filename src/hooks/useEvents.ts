import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { userUpcomingEvents, userPastEvents } from '@/data/events';
import type { EventRow, SidebarEvent } from '@/types/event';

interface UseEventsResult {
  data: EventRow[] | null;
  eventsByDate: Record<string, EventRow[]>;
  isLoading: boolean;
  error: Error | null;
}

// Transform database row to EventRow type
function transformToEventRow(dbEvent: any): EventRow {
  return {
    id: dbEvent.id,
    image: dbEvent.image,
    time: dbEvent.time,
    duration: dbEvent.duration,
    title: dbEvent.title,
    organizer: dbEvent.organizer,
    organizerAvatar: dbEvent.organizer_avatar || '',
    departureLocation: dbEvent.departure_location,
    transportMethod: dbEvent.transport_method,
    activity: dbEvent.activity,
    difficulty: dbEvent.difficulty,
    distance: dbEvent.distance,
    elevation: dbEvent.elevation,
    totalHeight: dbEvent.total_height || '',
    attendees: dbEvent.attendees,
    availableSpots: dbEvent.available_spots,
    waitlist: dbEvent.waitlist,
    attendeeAvatars: dbEvent.attendee_avatars || [],
    routeId: dbEvent.route_id,
  };
}

// Group events by date label
function groupEventsByDate(events: EventRow[], dbEvents: any[]): Record<string, EventRow[]> {
  const grouped: Record<string, EventRow[]> = {};
  
  dbEvents.forEach((dbEvent, index) => {
    const dateLabel = dbEvent.date_label;
    if (!grouped[dateLabel]) {
      grouped[dateLabel] = [];
    }
    grouped[dateLabel].push(events[index]);
  });
  
  return grouped;
}

export function useEvents(): UseEventsResult {
  const [data, setData] = useState<EventRow[] | null>(null);
  const [eventsByDate, setEventsByDate] = useState<Record<string, EventRow[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const { data: dbEvents, error: fetchError } = await supabase
          .from('events')
          .select('*')
          .eq('is_past', false)
          .order('event_date', { ascending: true });

        if (fetchError) throw fetchError;

        const events = (dbEvents || []).map(transformToEventRow);
        setData(events);
        setEventsByDate(groupEventsByDate(events, dbEvents || []));
        setIsLoading(false);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Failed to load events'));
        setIsLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return { data, eventsByDate, isLoading, error };
}

interface UseUserEventsResult {
  upcoming: SidebarEvent[];
  past: SidebarEvent[];
  isLoading: boolean;
  error: Error | null;
}

export function useUserEvents(): UseUserEventsResult {
  const [upcoming, setUpcoming] = useState<SidebarEvent[]>([]);
  const [past, setPast] = useState<SidebarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // Still using mock data for user events (requires auth)
        setUpcoming(userUpcomingEvents);
        setPast(userPastEvents);
        setIsLoading(false);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Failed to load user events'));
        setIsLoading(false);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return { upcoming, past, isLoading, error };
}

// New hook for past events
interface UsePastEventsResult {
  data: EventRow[] | null;
  isLoading: boolean;
  error: Error | null;
}

export function usePastEvents(): UsePastEventsResult {
  const [data, setData] = useState<EventRow[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPastEvents() {
      try {
        const { data: dbEvents, error: fetchError } = await supabase
          .from('events')
          .select('*')
          .eq('is_past', true)
          .order('event_date', { ascending: false });

        if (fetchError) throw fetchError;

        const events = (dbEvents || []).map(transformToEventRow);
        setData(events);
        setIsLoading(false);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Failed to load past events'));
        setIsLoading(false);
      }
    }

    fetchPastEvents();
  }, []);

  return { data, isLoading, error };
}
