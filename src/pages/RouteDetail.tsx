import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Calendar,
  Thermometer,
  Car,
  Dog,
  Baby,
  Accessibility,
  Utensils,
  Toilet,
  Bus,
  Home,
  Compass,
  ChevronRight,
  CheckCircle2,
  Mountain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DetailViewLayout, { 
  OrganizerSection, 
  PhotosFromEvents, 
  CommentsSection, 
  DescriptionSection 
} from '@/components/DetailViewLayout';
import StatsRow from '@/components/detail/StatsRow';
import MapSection from '@/components/detail/MapSection';
import { cn } from '@/lib/utils';
import { irishRoutes } from '@/data/routes';
import { eventRows } from '@/data/events';

const technicalityColors: Record<string, string> = {
  T1: 'bg-emerald-500',
  T2: 'bg-emerald-600',
  T3: 'bg-yellow-500',
  T4: 'bg-orange-500',
  T5: 'bg-rose-500',
  T6: 'bg-rose-600'
};

const technicalityDescriptions: Record<string, string> = {
  T1: 'Easy hiking trail, well-marked paths',
  T2: 'Mountain hiking, some steep sections',
  T3: 'Demanding mountain hiking, exposure possible',
  T4: 'Alpine hiking, requires experience',
  T5: 'Demanding alpine hiking, scrambling required',
  T6: 'Difficult alpine hiking, climbing skills needed'
};

const facilityIcons: Record<string, React.ElementType> = {
  'Restaurant': Utensils,
  'Mountain hut': Home,
  'Toilets': Toilet,
  'Parking': Car,
  'Public Transport': Bus
};

const accessibilityIcons: Record<string, React.ElementType> = {
  'Kid-friendly': Baby,
  'Dog-friendly': Dog,
  'Wheelchair-friendly': Accessibility
};

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

function formatRouteType(type: string): string {
  switch (type) {
    case 'loop': return 'Loop';
    case 'out-back': return 'Out & Back';
    case 'point-to-point': return 'Point-to-Point';
    default: return type;
  }
}

function formatSeason(season: string): string {
  switch (season) {
    case 'all-year': return 'All Year';
    case 'summer': return 'Summer Only';
    case 'winter': return 'Winter Only';
    default: return season;
  }
}

// Mock route creator
const mockCreator = {
  name: 'Luisa',
  photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  badge: 'Trail Rookie',
};

// Mock comments
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

// Get past events for this route
function getPastEventsForRoute(routeId: string) {
  return eventRows.slice(0, 3).map((event, idx) => ({
    ...event,
    linkedRouteId: routeId,
    date: idx === 0 ? '2 weeks ago' : idx === 1 ? 'Dec 15' : 'Nov 28',
    isPast: true,
  }));
}

export default function RouteDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const route = irishRoutes.find(r => r.id === id);
  const pastEvents = id ? getPastEventsForRoute(id) : [];

  const notFoundContent = (
    <div className="text-center">
      <Compass className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
      <h1 className="text-2xl font-bold mb-2">Route Not Found</h1>
      <p className="text-muted-foreground mb-6">This trail seems to have wandered off the map.</p>
      <Button onClick={() => navigate('/routes')}>Back to Routes</Button>
    </div>
  );

  // Date info line (location for routes)
  const dateInfo = route && (
    <div className="flex items-center gap-2 flex-wrap">
      <MapPin className="w-3 h-3" />
      <span>from {route.location}</span>
    </div>
  );

  // Creator chip (instead of organizer)
  const creatorChip = route && (
    <Link 
      to={`/profile`}
      className="inline-flex items-center gap-2 bg-muted rounded-full px-3 py-1.5 hover:bg-muted/80 transition-colors"
    >
      <Avatar className="w-6 h-6">
        <AvatarImage src={mockCreator.photo} alt={mockCreator.name} />
        <AvatarFallback className="bg-primary/10 text-primary text-xs">
          {mockCreator.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium text-foreground">{mockCreator.name}</span>
      <span className="text-xs text-muted-foreground">+12</span>
    </Link>
  );

  // Stats row for routes - estimate elevation from duration & difficulty
  const estimatedElevation = route ? Math.round(route.distance * 50) : 0;
  const statsRow = route && (
    <StatsRow 
      stats={[
        { label: 'Activity', value: 'Hiking' },
        { label: 'Distance', value: `${route.distance}km` },
        { label: 'Elevation', value: `${estimatedElevation}m` },
        { label: 'Duration', value: formatDuration(route.duration) },
      ]}
    />
  );

  // Map section with route image
  const mapSection = route && (
    <MapSection
      imageUrl={route.thumbnail}
      showRouteLink={false}
      showDownloadGpx={true}
      participantPhotos={eventRows[0]?.attendeeAvatars}
      participantCount={13}
    />
  );

  // Left column content
  const leftColumn = route && (
    <>
      {/* Description */}
      <DescriptionSection
        content={route.description}
        disclaimer="Hiking can be dangerous. I am not a mountain guide. Everybody is responsible for her/himself. Make yourself familiar with the route and its requirements. It's recommended to download a map and bring a cell phone and first aid kit for emergencies."
      />

      {/* Route Creator (instead of Organizer) */}
      <OrganizerSection
        name={mockCreator.name}
        photo={mockCreator.photo}
        badge={mockCreator.badge}
        badgeColor="bg-emerald-500"
        label="Route Creator"
        onSendMessage={() => console.log('Send message')}
      />

      {/* Photos from Previous Events */}
      <PhotosFromEvents
        images={mockEventPhotos}
        totalCount={12}
        onSeeAll={() => navigate('/events')}
      />

      {/* Technical Details */}
      <Card className="p-4 mb-6">
        <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2 uppercase text-xs tracking-wider text-muted-foreground">
          <Mountain className="w-4 h-4" />
          Technical Details
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Technicality Grade</span>
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold",
                technicalityColors[route.technicality]
              )}>
                {route.technicality}
              </div>
              <span className="text-sm text-foreground">{technicalityDescriptions[route.technicality]}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Difficulty</span>
            <span className="text-sm font-medium capitalize text-foreground">{route.difficulty}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Route Type</span>
            <span className="text-sm font-medium text-foreground">{formatRouteType(route.routeType)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Best Season</span>
            <span className="text-sm font-medium text-foreground">{formatSeason(route.season)}</span>
          </div>
        </div>
      </Card>

      {/* Facilities */}
      {route.facilities.length > 0 && (
        <Card className="p-4 mb-6">
          <h2 className="font-semibold text-foreground mb-3 uppercase text-xs tracking-wider text-muted-foreground">Facilities</h2>
          <div className="flex flex-wrap gap-2">
            {route.facilities.map((facility) => {
              const Icon = facilityIcons[facility] || MapPin;
              return (
                <Badge key={facility} variant="outline" className="gap-1.5 py-1.5">
                  <Icon className="w-3.5 h-3.5" />
                  {facility}
                </Badge>
              );
            })}
          </div>
        </Card>
      )}

      {/* Accessibility */}
      {route.accessibility.length > 0 && (
        <Card className="p-4 mb-6">
          <h2 className="font-semibold text-foreground mb-3 uppercase text-xs tracking-wider text-muted-foreground">Accessibility</h2>
          <div className="flex flex-wrap gap-2">
            {route.accessibility.map((option) => {
              const Icon = accessibilityIcons[option] || Accessibility;
              return (
                <Badge key={option} variant="secondary" className="gap-1.5 py-1.5">
                  <Icon className="w-3.5 h-3.5" />
                  {option}
                </Badge>
              );
            })}
          </div>
        </Card>
      )}

      {/* Highlights */}
      {route.highlights.length > 0 && (
        <div className="mb-6">
          <h2 className="font-semibold text-foreground mb-3 uppercase text-xs tracking-wider text-muted-foreground">Highlights</h2>
          <div className="space-y-2">
            {route.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );

  // Right column - Past events + Comments
  const rightColumn = route && (
    <>
      {/* Past Events on this Route */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-foreground uppercase text-xs tracking-wider text-muted-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Past Events on this Route
          </h2>
          <Button variant="link" size="sm" className="text-primary p-0" asChild>
            <Link to="/events">See all</Link>
          </Button>
        </div>
        
        {pastEvents.length > 0 ? (
          <div className="space-y-3">
            {pastEvents.map((event) => (
              <Link 
                key={event.id} 
                to={`/events/${event.id}`}
                className="block"
              >
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{event.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span>{event.date}</span>
                      <span>•</span>
                      <span>{event.difficulty}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <div className="flex -space-x-2">
                        {event.attendeeAvatars.slice(0, 3).map((avatar, idx) => (
                          <Avatar key={idx} className="w-5 h-5 border border-background">
                            <AvatarImage src={avatar} />
                            <AvatarFallback className="text-[8px]">U</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground ml-1">
                        {event.attendees} went
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <Calendar className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No past events on this route</p>
          </div>
        )}
      </div>

      {/* Comments */}
      <CommentsSection
        comments={mockComments}
        onAddComment={(content) => console.log('Add comment:', content)}
        onClearAll={() => console.log('Clear all')}
      />
    </>
  );

  return (
    <DetailViewLayout
      title={route?.name || 'Route'}
      dateInfo={dateInfo}
      organizerChip={creatorChip}
      statsRow={statsRow}
      mapSection={mapSection}
      leftColumn={leftColumn}
      rightColumn={rightColumn}
      notFound={!route}
      notFoundContent={notFoundContent}
      onClose={() => navigate('/routes')}
    >
      {/* Fallback for mobile */}
      {route && (
        <DescriptionSection
          content={route.description}
        />
      )}
    </DetailViewLayout>
  );
}
