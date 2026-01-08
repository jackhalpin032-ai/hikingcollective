type EmptyStateKind = 'events' | 'routes' | 'profile' | 'eventDetail';

interface EmptyState {
  title: string;
  message: string;
}

const copies: Record<EmptyStateKind, EmptyState> = {
  events: {
    title: 'No events found',
    message: 'Try adjusting your filters to find events that match your interests.'
  },
  routes: {
    title: 'No routes match your filters',
    message: 'Try adjusting your filters to discover more adventures.'
  },
  profile: {
    title: 'Profile not found',
    message: "This profile doesn't exist or has been removed."
  },
  eventDetail: {
    title: 'Event not found',
    message: "This event doesn't exist or has been removed."
  }
};

export function getEmptyStateCopy(kind: EmptyStateKind): EmptyState {
  return copies[kind];
}
