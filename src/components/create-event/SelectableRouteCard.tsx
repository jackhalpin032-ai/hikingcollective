import { Clock, MapPin, Mountain, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { HikingRoute } from '@/data/routes';

interface SelectableRouteCardProps {
  route: HikingRoute;
  isSelected: boolean;
  onSelect: (routeId: string) => void;
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

export function SelectableRouteCard({ route, isSelected, onSelect }: SelectableRouteCardProps) {
  return (
    <Card 
      onClick={() => onSelect(route.id)}
      className={cn(
        "group overflow-hidden border-2 bg-card transition-all duration-300 cursor-pointer",
        "hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1",
        isSelected 
          ? "border-primary ring-2 ring-primary/20" 
          : "border-border/50 hover:border-primary/50"
      )}
    >
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
        
        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg animate-scale-in">
            <Check className="w-5 h-5 text-primary-foreground" />
          </div>
        )}
        
        {/* Location badge */}
        <div className={cn("absolute top-3", isSelected ? "left-14" : "left-3")}>
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
      
      <CardContent className="p-4 space-y-3">
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
          {route.highlights.slice(0, 3).map((highlight) => (
            <span
              key={highlight}
              className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
            >
              {highlight}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
