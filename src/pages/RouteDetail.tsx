import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Mountain, 
  MapPin, 
  Calendar,
  Users,
  Thermometer,
  Car,
  Dog,
  Baby,
  Accessibility,
  Utensils,
  Toilet,
  Bus,
  Home,
  TrendingUp,
  Route,
  Compass,
  Share2,
  Heart,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Map,
  ArrowLeftRight
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DifficultyBadge from '@/components/profile/DifficultyBadge';
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

// Mock linked events for demonstration
function getEventsForRoute(routeId: string) {
  // In a real app, this would filter events by route.
  // For now, return a subset of events as "linked" to this route.
  return eventRows.slice(0, 3).map((event, idx) => ({
    ...event,
    linkedRouteId: routeId,
    date: idx === 0 ? 'Tomorrow' : idx === 1 ? 'Jan 18' : 'Jan 25',
  }));
}

export default function RouteDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const route = irishRoutes.find(r => r.id === id);
  const linkedEvents = id ? getEventsForRoute(id) : [];
  
  if (!route) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Compass className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Route Not Found</h1>
            <p className="text-muted-foreground mb-6">This trail seems to have wandered off the map.</p>
            <Button onClick={() => navigate('/routes')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Routes
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background flex flex-col">
      <Header />
      
      <main className="flex-1 pb-24">
        {/* Back button & Header */}
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border/50">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="font-semibold text-foreground truncate">{route.name}</h1>
            </div>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 pt-6">
          {/* Hero Image */}
          <div className="relative rounded-xl overflow-hidden mb-6">
            <img
              src={route.thumbnail}
              alt={route.name}
              className="w-full h-48 md:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-white/90 text-foreground">
                  <MapPin className="w-3 h-3 mr-1" />
                  {route.location}
                </Badge>
                <div className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold",
                  technicalityColors[route.technicality]
                )}>
                  {route.technicality}
                </div>
              </div>
            </div>
          </div>

          {/* Title & Difficulty */}
          <div className="mb-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h1 className="text-2xl font-bold text-foreground">{route.name}</h1>
              <DifficultyBadge level={route.difficulty} />
            </div>
          </div>

          {/* Quick Stats */}
          <Card className="p-4 mb-6">
            <div className="flex items-center justify-around">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-primary mb-1">
                  <ArrowLeftRight className="w-4 h-4" />
                </div>
                <p className="text-lg font-bold text-foreground">{route.distance} km</p>
                <p className="text-xs text-muted-foreground">Distance</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-primary mb-1">
                  <Clock className="w-4 h-4" />
                </div>
                <p className="text-lg font-bold text-foreground">{formatDuration(route.duration)}</p>
                <p className="text-xs text-muted-foreground">Duration</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-primary mb-1">
                  <Route className="w-4 h-4" />
                </div>
                <p className="text-lg font-bold text-foreground">{formatRouteType(route.routeType)}</p>
                <p className="text-xs text-muted-foreground">Type</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-primary mb-1">
                  <Thermometer className="w-4 h-4" />
                </div>
                <p className="text-lg font-bold text-foreground">{formatSeason(route.season)}</p>
                <p className="text-xs text-muted-foreground">Season</p>
              </div>
            </div>
          </Card>

          {/* Description */}
          <div className="mb-6">
            <h2 className="font-semibold text-foreground mb-2">About this Route</h2>
            <p className="text-muted-foreground leading-relaxed">{route.description}</p>
          </div>

          {/* Highlights */}
          {route.highlights.length > 0 && (
            <div className="mb-6">
              <h2 className="font-semibold text-foreground mb-3">Highlights</h2>
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

          {/* Map Placeholder */}
          <Card className="p-4 mb-6">
            <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Map className="w-4 h-4" />
              Route Map
            </h2>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center text-muted-foreground">
                <Compass className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="font-medium">Interactive Map</p>
                <p className="text-sm">Map integration coming soon</p>
              </div>
            </div>
          </Card>

          {/* Elevation Profile Placeholder */}
          <Card className="p-4 mb-6">
            <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Elevation Profile
            </h2>
            <div className="h-40 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center text-muted-foreground">
                <svg className="w-32 h-16 mx-auto mb-2 opacity-30" viewBox="0 0 200 60">
                  <path
                    d="M0,50 Q20,45 40,35 T80,20 T120,30 T160,15 T200,40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M0,50 Q20,45 40,35 T80,20 T120,30 T160,15 T200,40 L200,60 L0,60 Z"
                    fill="currentColor"
                    opacity="0.1"
                  />
                </svg>
                <p className="font-medium">Elevation Chart</p>
                <p className="text-sm">Elevation data coming soon</p>
              </div>
            </div>
          </Card>

          {/* Technical Details */}
          <Card className="p-4 mb-6">
            <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Mountain className="w-4 h-4" />
              Technical Details
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Technicality Grade</span>
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold",
                    technicalityColors[route.technicality]
                  )}>
                    {route.technicality}
                  </div>
                  <span className="text-sm text-foreground">{technicalityDescriptions[route.technicality]}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Difficulty</span>
                <span className="font-medium capitalize text-foreground">{route.difficulty}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Distance</span>
                <span className="font-medium text-foreground">{route.distance} km</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium text-foreground">{formatDuration(route.duration)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Route Type</span>
                <span className="font-medium text-foreground">{formatRouteType(route.routeType)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Best Season</span>
                <span className="font-medium text-foreground">{formatSeason(route.season)}</span>
              </div>
            </div>
          </Card>

          {/* Facilities */}
          {route.facilities.length > 0 && (
            <Card className="p-4 mb-6">
              <h2 className="font-semibold text-foreground mb-3">Facilities</h2>
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
              <h2 className="font-semibold text-foreground mb-3">Accessibility</h2>
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

          {/* Route Features */}
          {route.features.length > 0 && (
            <Card className="p-4 mb-6">
              <h2 className="font-semibold text-foreground mb-3">Route Features</h2>
              <div className="flex flex-wrap gap-2">
                {route.features.map((feature) => (
                  <Badge key={feature} variant="outline" className="py-1.5">
                    {feature}
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          {/* Events History */}
          <Card className="p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Events on this Route
              </h2>
              <Button variant="ghost" size="sm" className="text-primary" asChild>
                <Link to="/events">View all</Link>
              </Button>
            </div>
            
            {linkedEvents.length > 0 ? (
              <div className="space-y-3">
                {linkedEvents.map((event) => (
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
                          <span>{event.time}</span>
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
                            {event.attendees} going
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
                <p className="text-sm">No events scheduled yet</p>
                <p className="text-xs mt-1">Be the first to organize a hike!</p>
              </div>
            )}
          </Card>
        </div>
      </main>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4">
        <div className="max-w-2xl mx-auto flex gap-3">
          <Button variant="outline" className="flex-1">
            <Heart className="w-4 h-4 mr-2" />
            Save Route
          </Button>
          <Button className="flex-1" asChild>
            <Link to={`/events?route=${route.id}`}>
              <Users className="w-4 h-4 mr-2" />
              Create Event
            </Link>
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
