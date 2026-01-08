import { useState, useEffect } from 'react';
import { getEventById } from '@/data/events';
import type { Event } from '@/types/event';

interface UseEventByIdResult {
  data: Event | null;
  isLoading: boolean;
  error: Error | null;
}

export function useEventById(id: string | undefined): UseEventByIdResult {
  const [data, setData] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setError(new Error('No event ID provided'));
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      try {
        const event = getEventById(id);
        if (event) {
          setData(event);
        } else {
          setError(new Error('Event not found'));
        }
        setIsLoading(false);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Failed to load event'));
        setIsLoading(false);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [id]);

  return { data, isLoading, error };
}
