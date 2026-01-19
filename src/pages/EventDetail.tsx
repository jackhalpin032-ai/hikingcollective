import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DetailViewLayout, { 
  OrganizerSection, 
  PhotosFromEvents, 
  CommentsSection, 
  DescriptionSection 
} from '@/components/DetailViewLayout';
import StatsRow from '@/components/detail/StatsRow';
import ParticipantsRow from '@/components/detail/ParticipantsRow';
import MapSection from '@/components/detail/MapSection';
import GettingThereSection from '@/components/detail/GettingThereSection';
import { useEventById } from '@/hooks/useEventById';
import { getEmptyStateCopy } from '@/lib/emptyStates';
import { 
  Train,
  Car,
  Bus,
} from 'lucide-react';

// Transport icons mapping
const transportIcons: Record<string, React.ElementType> = {
  Train: Train,
  Car: Car,
  Carpool: Car,
  Bus: Bus,
};

// Mock comments for demonstration
const mockComments = [
  {
    id: '1',
    author: 'Leo',
    authorPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    content: 'He just likes leaving smart comments and asking intelligent questions',
  },
  {
    id: '2',
    author: 'Jessica',
    authorPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    content: 'I would like to come by car, what time do you start hiking?',
  },
];

// Mock photos from previous events
const mockEventPhotos = [
  'https://images.unsplash.com/photo-1551632811-561732d1e306?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&h=200&fit=crop',
];

export default function EventDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const { data: event, isLoading, error } = useEventById(id);
  const emptyState = getEmptyStateCopy('eventDetail');

  const notFoundContent = (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-foreground mb-2">{emptyState.title}</h1>
      <p className="text-muted-foreground mb-4">{emptyState.message}</p>
      <Button onClick={() => navigate('/events')}>Back to Events</Button>
    </div>
  );

  const TransportIcon = event ? (transportIcons[event.transport] || Train) : Train;

  // Build date info line
  const dateInfo = event && (
    <div className="flex items-center gap-2 flex-wrap">
      <span>{event.date}</span>
      <span>•</span>
      <span>from {event.location}</span>
      <span>•</span>
      <span className="flex items-center gap-1">
        with <TransportIcon className="w-3 h-3" /> {event.transport}
      </span>
    </div>
  );

  // Organizer chip
  const organizerChip = event && (
    <Link 
      to={`/profile`}
      className="inline-flex items-center gap-2 bg-muted rounded-full px-3 py-1.5 hover:bg-muted/80 transition-colors"
    >
      <Avatar className="w-6 h-6">
        <AvatarImage src={event.organizer.photo} alt={event.organizer.name} />
        <AvatarFallback className="bg-primary/10 text-primary text-xs">
          {event.organizer.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium text-foreground">{event.organizer.name}</span>
      <span className="text-xs text-muted-foreground">+{event.organizer.eventsOrganised}</span>
    </Link>
  );

  // Stats row
  const statsRow = event && (
    <StatsRow 
      stats={[
        { label: 'Activity', value: event.activity },
        { label: 'Distance', value: event.distance },
        { label: 'Elevation', value: event.elevation },
        { label: 'Duration', value: event.duration },
      ]}
    />
  );

  // Participants row
  const participantsRow = event && (
    <ParticipantsRow
      participants={event.participants}
      totalCount={event.currentParticipants}
      maxCount={event.maxParticipants}
      status={event.status}
      onJoin={() => console.log('Join event')}
      onOptions={() => console.log('Options')}
    />
  );

  // Map section
  const mapSection = event && (
    <MapSection
      imageUrl={event.image}
      routeId="wicklow-way"
      showRouteLink={true}
      showDownloadGpx={true}
    />
  );

  // Left column content
  const leftColumn = event && (
    <>
      {/* Getting There */}
      <GettingThereSection
        meetingPoint={event.meetingPoint}
        mapLink="https://www.google.com/maps"
        price="5 EUR"
      />

      {/* Description */}
      <DescriptionSection
        content={event.description}
        disclaimer="Hiking can be dangerous. I am not a mountain guide. Everybody is responsible for her/himself. Make yourself familiar with the route and its requirements. It's recommended to download a map and bring a cell phone and first aid kit for emergencies."
      />

      {/* Organizer */}
      <OrganizerSection
        name={event.organizer.name}
        photo={event.organizer.photo}
        badge="Trail Rookie"
        badgeColor="bg-emerald-500"
        rating={event.organizer.rating}
        eventsOrganised={event.organizer.eventsOrganised}
        onSendMessage={() => console.log('Send message')}
      />

      {/* Photos from Previous Events */}
      <PhotosFromEvents
        images={mockEventPhotos}
        totalCount={12}
        onSeeAll={() => navigate('/events')}
      />
    </>
  );

  // Right column - comments
  const rightColumn = (
    <CommentsSection
      comments={mockComments}
      onAddComment={(content) => console.log('Add comment:', content)}
      onClearAll={() => console.log('Clear all')}
    />
  );

  return (
    <DetailViewLayout
      title={event?.title || 'Event'}
      dateInfo={dateInfo}
      organizerChip={organizerChip}
      statsRow={statsRow}
      participantsRow={participantsRow}
      mapSection={mapSection}
      leftColumn={leftColumn}
      rightColumn={rightColumn}
      isLoading={isLoading}
      loadingMessage="Loading event..."
      notFound={!!error || !event}
      notFoundContent={notFoundContent}
      onClose={() => navigate('/events')}
    >
      {/* Fallback content for mobile single-column view */}
      {event && (
        <>
          <GettingThereSection
            meetingPoint={event.meetingPoint}
            mapLink="https://www.google.com/maps"
            price="5 EUR"
          />
          <DescriptionSection
            content={event.description}
            disclaimer="Hiking can be dangerous."
          />
        </>
      )}
    </DetailViewLayout>
  );
}
