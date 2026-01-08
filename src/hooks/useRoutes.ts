import { useState, useEffect } from 'react';
import { irishRoutes } from '@/data/routes';
import type { HikingRoute } from '@/types/route';

interface UseRoutesResult {
  data: HikingRoute[] | null;
  isLoading: boolean;
  error: Error | null;
}

export function useRoutes(): UseRoutesResult {
  const [data, setData] = useState<HikingRoute[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setData(irishRoutes);
        setIsLoading(false);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Failed to load routes'));
        setIsLoading(false);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return { data, isLoading, error };
}

export function useRouteById(id: string | undefined): { data: HikingRoute | null; isLoading: boolean; error: Error | null } {
  const [data, setData] = useState<HikingRoute | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setError(new Error('No route ID provided'));
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      try {
        const route = irishRoutes.find(r => r.id === id);
        if (route) {
          setData(route);
        } else {
          setError(new Error('Route not found'));
        }
        setIsLoading(false);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Failed to load route'));
        setIsLoading(false);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [id]);

  return { data, isLoading, error };
}
