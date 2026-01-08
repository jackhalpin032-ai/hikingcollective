import { useState, useEffect } from 'react';
import { eventRows, getEventsByDate, userUpcomingEvents, userPastEvents } from '@/data/events';
import type { EventRow, SidebarEvent } from '@/types/event';

interface UseEventsResult {
  data: EventRow[] | null;
  eventsByDate: Record<string, EventRow[]>;
  isLoading: boolean;
  error: Error | null;
}

export function useEvents(): UseEventsResult {
  const [data, setData] = useState<EventRow[] | null>(null);
  const [eventsByDate, setEventsByDate] = useState<Record<string, EventRow[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setData(eventRows);
        setEventsByDate(getEventsByDate());
        setIsLoading(false);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Failed to load events'));
        setIsLoading(false);
      }
    }, 0);
    return () => clearTimeout(timer);
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
