import { Link } from 'react-router-dom';
import { Clock, MapPin, Mountain, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { HikingRoute } from '@/data/routes';

interface RouteCardProps {
  route: HikingRoute;
}

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

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export default function RouteCard({ route }: RouteCardProps) {
  return (
    <Link to={`/routes/${route.id}`} className="block">
      <Card className="group overflow-hidden border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        {/* Thumbnail */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={route.thumbnail}
            alt={route.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Location badge */}
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-foreground text-xs">
              <MapPin className="w-3 h-3 mr-1" />
              {route.location}
            </Badge>
          </div>
          
          {/* Technicality badge */}
          <div className="absolute top-3 right-3">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md",
              technicalityColors[route.technicality]
            )}>
              {route.technicality}
            </div>
          </div>
          
          {/* Route name overlay */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-lg font-semibold text-white line-clamp-2 drop-shadow-md">
              {route.name}
            </h3>
          </div>
        </div>
        
        <CardContent className="p-4 space-y-4">
          {/* Stats row */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Mountain className="w-4 h-4" />
              <span>{route.distance} km</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{formatDuration(route.duration)}</span>
            </div>
            <Badge 
              variant="outline" 
              className={cn("capitalize text-xs", difficultyColors[route.difficulty])}
            >
              {route.difficulty}
            </Badge>
          </div>
          
          {/* Highlights */}
          <div className="flex flex-wrap gap-1.5">
            {route.highlights.slice(0, 4).map((highlight) => (
              <span
                key={highlight}
                className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
              >
                {highlight}
              </span>
            ))}
          </div>
          
          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {route.description}
          </p>
          
          {/* View button */}
          <div className="w-full flex justify-between items-center py-2 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
            <span>View Route</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
