import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DifficultyBadge from '@/components/profile/DifficultyBadge';
import { 
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Train,
  Mountain,
  ArrowLeftRight,
  TrendingUp,
  Users,
  Share2,
  MessageCircle,
  Heart,
  Sun,
  Thermometer,
  Wind,
  Droplets,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

// Mock event data - in production this would come from an API/database
const mockEvents: Record<string, {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  meetingPoint: string;
  location: string;
  transport: string;
  difficulty: string;
  distance: string;
  elevation: string;
  duration: string;
  maxParticipants: number;
  currentParticipants: number;
  status: 'going' | 'organiser' | 'closed' | 'available';
  organizer: {
    name: string;
    photo?: string;
    rating: number;
    eventsOrganised: number;
  };
  participants: Array<{
    name: string;
    photo?: string;
  }>;
  requirements: string[];
  whatToBring: string[];
  weather: {
    condition: string;
    temp: string;
    wind: string;
    humidity: string;
  };
  route: {
    highlights: string[];
    warnings: string[];
  };
}> = {
  '1': {
    id: '1',
    title: 'Wendelstein sunrise hike',
    description: 'Experience the magic of watching the sunrise from one of Bavaria\'s most iconic peaks! We\'ll start early to reach the summit just as the first rays of light paint the Alps in golden hues. This is a moderate hike suitable for those with some hiking experience.',
    date: 'Saturday, January 11, 2025',
    time: '5:30 AM',
    meetingPoint: 'Munich Hauptbahnhof, Platform 12',
    location: 'Wendelstein, Bavaria',
    transport: 'Car (carpooling available)',
    difficulty: 'T3',
    distance: '14km',
    elevation: '1240m',
    duration: '5h 30min',
    maxParticipants: 12,
    currentParticipants: 9,
    status: 'organiser',
    organizer: {
      name: 'Jack',
      rating: 4.9,
      eventsOrganised: 12,
    },
    participants: [
      { name: 'Sarah' },
      { name: 'Marcus' },
      { name: 'Elena' },
      { name: 'Tom' },
      { name: 'Lisa' },
      { name: 'Alex' },
      { name: 'Maria' },
      { name: 'Ben' },
      { name: 'Sophie' },
    ],
    requirements: [
      'Good fitness level',
      'Previous hiking experience recommended',
      'Headlamp required for early start',
      'Warm layers for summit temperatures'
    ],
    whatToBring: [
      'Hiking boots with good ankle support',
      'Headlamp with spare batteries',
      'Warm layers (temps around 0°C at summit)',
      '2L water minimum',
      'Snacks and packed breakfast',
      'Sunglasses and sunscreen',
      'First aid kit',
      'Trekking poles (optional)'
    ],
    weather: {
      condition: 'Clear',
      temp: '-2°C to 8°C',
      wind: '15 km/h',
      humidity: '45%'
    },
    route: {
      highlights: [
        'Spectacular sunrise views over the Alps',
        'Panoramic summit with 360° views',
        'Historic Wendelstein Chapel',
        'Optional cable car descent'
      ],
      warnings: [
        'Early start required - meet at 5:30 AM sharp',
        'Summit can be cold and windy',
        'Some exposed sections near the top'
      ]
    }
  },
  '2': {
    id: '2',
    title: 'Herzogstand panorama trail',
    description: 'A classic Bavarian hike with stunning views of the Walchensee and surrounding peaks. Perfect for a day out with fellow hiking enthusiasts!',
    date: 'Sunday, January 12, 2025',
    time: '8:00 AM',
    meetingPoint: 'Munich Hauptbahnhof, S-Bahn Platform',
    location: 'Herzogstand, Bavaria',
    transport: 'Train',
    difficulty: 'T2',
    distance: '12km',
    elevation: '890m',
    duration: '4h',
    maxParticipants: 15,
    currentParticipants: 13,
    status: 'going',
    organizer: {
      name: 'Lisa',
      rating: 4.8,
      eventsOrganised: 24,
    },
    participants: [
      { name: 'Jack' },
      { name: 'Emma' },
      { name: 'David' },
      { name: 'Anna' },
      { name: 'Chris' },
      { name: 'Julia' },
      { name: 'Max' },
      { name: 'Nina' },
      { name: 'Felix' },
      { name: 'Laura' },
      { name: 'Tim' },
      { name: 'Mia' },
    ],
    requirements: [
      'Basic fitness level',
      'Suitable for hiking beginners with guidance'
    ],
    whatToBring: [
      'Comfortable hiking shoes',
      'Weather-appropriate clothing',
      '1.5L water',
      'Lunch and snacks',
      'Small backpack'
    ],
    weather: {
      condition: 'Partly cloudy',
      temp: '5°C to 12°C',
      wind: '10 km/h',
      humidity: '55%'
    },
    route: {
      highlights: [
        'Views of Walchensee and Kochelsee',
        'Ridge walk between Herzogstand and Heimgarten',
        'Traditional Bavarian hut for refreshments'
      ],
      warnings: [
        'Ridge can be slippery when wet'
      ]
    }
  }
};

export default function EventDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const event = mockEvents[id || '1'];
  
  if (!event) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Event not found</h1>
            <p className="text-muted-foreground mb-4">This event doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/events')}>Back to Events</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const spotsLeft = event.maxParticipants - event.currentParticipants;

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
              <h1 className="font-semibold text-foreground truncate">{event.title}</h1>
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
                <p className="text-lg font-bold text-foreground">Hiking</p>
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

          {/* Highlights */}
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

          {/* Warnings */}
          {event.route.warnings.length > 0 && (
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
        </div>
      </main>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4">
        <div className="max-w-2xl mx-auto flex gap-3">
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
        </div>
      </div>

      <Footer />
    </div>
  );
}
