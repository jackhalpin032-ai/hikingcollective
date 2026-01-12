import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import DetailViewLayout from '@/components/DetailViewLayout';
import DifficultyBadge from '@/components/profile/DifficultyBadge';
import { useEventById } from '@/hooks/useEventById';
import { getEmptyStateCopy } from '@/lib/emptyStates';
import { 
  Calendar,
  Clock,
  MapPin,
  Train,
  Mountain,
  ArrowLeftRight,
  TrendingUp,
  Users,
  MessageCircle,
  Sun,
  Thermometer,
  Wind,
  Droplets,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

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

  const spotsLeft = event ? event.maxParticipants - event.currentParticipants : 0;

  const bottomActions = event && (
    <>
      {event.status === 'going' ? (
        <>
          <Button variant="outline" className="flex-1 text-destructive border-destructive hover:bg-destructive/10">
            Unjoin Event
          </Button>
          <Button className="flex-1">
            <MessageCircle className="w-4 h-4 mr-2" />
            Message Group
          </Button>
        </>
      ) : event.status === 'organiser' ? (
        <>
          <Button variant="outline" className="flex-1">
            Edit Event
          </Button>
          <Button className="flex-1">
            <MessageCircle className="w-4 h-4 mr-2" />
            Message Group
          </Button>
        </>
      ) : (
        <>
          <Button variant="outline" className="flex-1">
            <MessageCircle className="w-4 h-4 mr-2" />
            Ask Question
          </Button>
          <Button className="flex-1">
            Join Event
          </Button>
        </>
      )}
    </>
  );

  return (
    <DetailViewLayout
      title={event?.title || 'Event'}
      isLoading={isLoading}
      loadingMessage="Loading event..."
      notFound={!!error || !event}
      notFoundContent={notFoundContent}
      bottomActions={bottomActions}
      onBack={() => navigate('/events')}
    >
      {event && (
        <>
          {/* Title & Status */}
          <div className="mb-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h1 className="text-2xl font-bold text-foreground">{event.title}</h1>
              <DifficultyBadge level={event.difficulty} />
            </div>
            
            {event.status === 'going' && (
              <Badge className="bg-primary text-primary-foreground">You are going</Badge>
            )}
            {event.status === 'organiser' && (
              <Badge className="bg-amber-500 text-white">You're the organiser</Badge>
            )}
            {event.status === 'available' && spotsLeft > 0 && (
              <Badge className="bg-primary/90 text-primary-foreground">{spotsLeft} spot{spotsLeft > 1 ? 's' : ''} left</Badge>
            )}
          </div>

          {/* Quick Info */}
          <Card className="p-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="text-sm font-medium text-foreground">{event.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Start time</p>
                  <p className="text-sm font-medium text-foreground">{event.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium text-foreground">{event.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Transport</p>
                  <p className="text-sm font-medium text-foreground">{event.transport}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Route Stats */}
          <Card className="p-4 mb-6">
            <h2 className="font-semibold text-foreground mb-3">Route Details</h2>
            <div className="flex items-center justify-around">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-primary mb-1">
                  <Mountain className="w-4 h-4" />
                </div>
                <p className="text-lg font-bold text-foreground">{event.activity}</p>
                <p className="text-xs text-muted-foreground">Activity</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-primary mb-1">
                  <ArrowLeftRight className="w-4 h-4" />
                </div>
                <p className="text-lg font-bold text-foreground">{event.distance}</p>
                <p className="text-xs text-muted-foreground">Distance</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-primary mb-1">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <p className="text-lg font-bold text-foreground">{event.elevation}</p>
                <p className="text-xs text-muted-foreground">Elevation</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-primary mb-1">
                  <Clock className="w-4 h-4" />
                </div>
                <p className="text-lg font-bold text-foreground">{event.duration}</p>
                <p className="text-xs text-muted-foreground">Duration</p>
              </div>
            </div>
          </Card>

          {/* Description */}
          <div className="mb-6">
            <h2 className="font-semibold text-foreground mb-2">About this hike</h2>
            <p className="text-muted-foreground leading-relaxed">{event.description}</p>
          </div>

          {/* Meeting Point */}
          <Card className="p-4 mb-6 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Meeting Point</h3>
                <p className="text-sm text-muted-foreground">{event.meetingPoint}</p>
                <p className="text-sm text-muted-foreground mt-1">Be there at <span className="font-semibold text-foreground">{event.time}</span></p>
              </div>
            </div>
          </Card>

          {/* Weather */}
          {event.weather && (
            <Card className="p-4 mb-6">
              <h2 className="font-semibold text-foreground mb-3">Weather Forecast</h2>
              <div className="flex items-center justify-around">
                <div className="text-center">
                  <Sun className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                  <p className="text-sm font-medium text-foreground">{event.weather.condition}</p>
                </div>
                <div className="text-center">
                  <Thermometer className="w-5 h-5 text-rose-500 mx-auto mb-1" />
                  <p className="text-sm font-medium text-foreground">{event.weather.temp}</p>
                </div>
                <div className="text-center">
                  <Wind className="w-5 h-5 text-sky-500 mx-auto mb-1" />
                  <p className="text-sm font-medium text-foreground">{event.weather.wind}</p>
                </div>
                <div className="text-center">
                  <Droplets className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                  <p className="text-sm font-medium text-foreground">{event.weather.humidity}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Highlights */}
          {event.route && event.route.highlights.length > 0 && (
            <div className="mb-6">
              <h2 className="font-semibold text-foreground mb-3">Highlights</h2>
              <div className="space-y-2">
                {event.route.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warnings */}
          {event.route && event.route.warnings.length > 0 && (
            <Card className="p-4 mb-6 bg-amber-500/10 border-amber-500/20">
              <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                Important Notes
              </h2>
              <div className="space-y-2">
                {event.route.warnings.map((warning, idx) => (
                  <p key={idx} className="text-sm text-muted-foreground">• {warning}</p>
                ))}
              </div>
            </Card>
          )}

          {/* Requirements */}
          <div className="mb-6">
            <h2 className="font-semibold text-foreground mb-3">Requirements</h2>
            <div className="flex flex-wrap gap-2">
              {event.requirements.map((req, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {req}
                </Badge>
              ))}
            </div>
          </div>

          {/* What to Bring */}
          <Card className="p-4 mb-6">
            <h2 className="font-semibold text-foreground mb-3">What to Bring</h2>
            <div className="grid grid-cols-1 gap-2">
              {event.whatToBring.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Organizer */}
          <Card className="p-4 mb-6">
            <h2 className="font-semibold text-foreground mb-3">Organiser</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={event.organizer.photo} alt={event.organizer.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {event.organizer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">{event.organizer.name}</p>
                  <p className="text-xs text-muted-foreground">
                    ⭐ {event.organizer.rating} • {event.organizer.eventsOrganised} events organised
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">View Profile</Button>
            </div>
          </Card>

          {/* Participants */}
          <Card className="p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <Users className="w-4 h-4" />
                Participants ({event.currentParticipants}/{event.maxParticipants})
              </h2>
              <span className="text-xs text-muted-foreground">{spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} left</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {event.participants.map((participant, idx) => (
                <Avatar key={idx} className="w-10 h-10 border-2 border-background">
                  <AvatarImage src={participant.photo} alt={participant.name} />
                  <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
                    {participant.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ))}
              {spotsLeft > 0 && (
                <div className="w-10 h-10 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">+{spotsLeft}</span>
                </div>
              )}
            </div>
          </Card>

          {/* Comments Section Placeholder */}
          <Card className="p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Comments (12)
              </h2>
              <Button variant="ghost" size="sm" className="text-primary">View all</Button>
            </div>
            <p className="text-sm text-muted-foreground">Join the conversation with other participants...</p>
          </Card>
        </>
      )}
    </DetailViewLayout>
  );
}
