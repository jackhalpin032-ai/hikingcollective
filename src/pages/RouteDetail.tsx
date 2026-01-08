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
  ChevronRight
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { irishRoutes } from '@/data/routes';

const difficultyColors = {
  easy: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  moderate: 'bg-amber-100 text-amber-700 border-amber-200',
  hard: 'bg-rose-100 text-rose-700 border-rose-200'
};

const technicalityColors: Record<string, string> = {
  T1: 'bg-emerald-500',
  T2: 'bg-emerald-600',
  T3: 'bg-yellow-500',
  T4: 'bg-orange-500',
  T5: 'bg-rose-500',
  T6: 'bg-rose-600'
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
  return mins > 0 ? `${hours}h ${mins}m` : `${hours} hours`;
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

export default function RouteDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const route = irishRoutes.find(r => r.id === id);
  
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
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Image */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <img
            src={route.thumbnail}
            alt={route.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          {/* Back button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/routes')}
            className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm hover:bg-background"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button variant="ghost" size="icon" className="bg-background/80 backdrop-blur-sm hover:bg-background">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="bg-background/80 backdrop-blur-sm hover:bg-background">
              <Heart className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Route name overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="container mx-auto max-w-6xl">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-white/90 text-foreground">
                  <MapPin className="w-3 h-3 mr-1" />
                  {route.location}
                </Badge>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold",
                  technicalityColors[route.technicality]
                )}>
                  {route.technicality}
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                {route.name}
              </h1>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-muted/30">
                  <CardContent className="p-4 text-center">
                    <Mountain className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-2xl font-bold">{route.distance} km</p>
                    <p className="text-xs text-muted-foreground">Distance</p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/30">
                  <CardContent className="p-4 text-center">
                    <Clock className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-2xl font-bold">{formatDuration(route.duration)}</p>
                    <p className="text-xs text-muted-foreground">Duration</p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/30">
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                    <Badge variant="outline" className={cn("text-sm", difficultyColors[route.difficulty])}>
                      {route.difficulty}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">Difficulty</p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/30">
                  <CardContent className="p-4 text-center">
                    <Route className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-lg font-semibold">{formatRouteType(route.routeType)}</p>
                    <p className="text-xs text-muted-foreground">Route Type</p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About this Route</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {route.description}
                  </p>
                  <Separator className="my-4" />
                  <div className="flex flex-wrap gap-2">
                    {route.highlights.map((highlight) => (
                      <Badge key={highlight} variant="secondary" className="text-sm">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Map Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Route Map
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                    <div className="text-center text-muted-foreground">
                      <Compass className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="font-medium">Interactive Map</p>
                      <p className="text-sm">Map integration coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Elevation Profile Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Elevation Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                    <div className="text-center text-muted-foreground">
                      <svg className="w-32 h-16 mx-auto mb-3 opacity-30" viewBox="0 0 200 60">
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
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Create Event CTA */}
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <Calendar className="w-10 h-10 mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold text-lg mb-1">Plan a Hike</h3>
                    <p className="text-sm text-muted-foreground">
                      Organize an event on this route and invite fellow hikers
                    </p>
                  </div>
                  <Button className="w-full" size="lg" asChild>
                    <Link to={`/events?route=${route.id}`}>
                      <Users className="w-4 h-4 mr-2" />
                      Create Event
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              {/* Route Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Route Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Thermometer className="w-4 h-4" />
                      Best Season
                    </span>
                    <span className="font-medium">{formatSeason(route.season)}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Route className="w-4 h-4" />
                      Route Type
                    </span>
                    <span className="font-medium">{formatRouteType(route.routeType)}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Technicality
                    </span>
                    <div className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold",
                      technicalityColors[route.technicality]
                    )}>
                      {route.technicality}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Facilities */}
              {route.facilities.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Facilities</CardTitle>
                  </CardHeader>
                  <CardContent>
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
                  </CardContent>
                </Card>
              )}
              
              {/* Accessibility */}
              {route.accessibility.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Accessibility</CardTitle>
                  </CardHeader>
                  <CardContent>
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
                  </CardContent>
                </Card>
              )}
              
              {/* Route Features */}
              {route.features.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Route Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {route.features.map((feature) => (
                        <Badge key={feature} variant="outline" className="py-1.5">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
