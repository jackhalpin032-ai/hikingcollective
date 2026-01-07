import { MapPin, Heart, ChevronRight } from 'lucide-react';

interface FavoriteTrail {
  name: string;
  location: string;
  timesHiked: number;
  image: string;
}

interface FavoriteTrailsProps {
  trails: FavoriteTrail[];
  onViewAll?: () => void;
}

export default function FavoriteTrails({ trails, onViewAll }: FavoriteTrailsProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-foreground flex items-center gap-2">
          <Heart className="w-4 h-4 text-rose-500" />
          Favorite Trails
        </h3>
        {onViewAll && (
          <button 
            onClick={onViewAll}
            className="text-primary text-sm font-medium flex items-center gap-1 hover:underline"
          >
            View all <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 snap-x snap-mandatory">
        {trails.map((trail, idx) => (
          <div 
            key={idx} 
            className="flex-shrink-0 w-36 snap-center cursor-pointer group"
          >
            <div className="relative rounded-xl overflow-hidden mb-2">
              <img 
                src={trail.image} 
                alt={trail.name}
                className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-1 right-1 bg-background/90 backdrop-blur-sm rounded-full px-2 py-0.5 text-[10px] font-medium text-foreground">
                {trail.timesHiked}x
              </div>
            </div>
            <p className="font-medium text-foreground text-sm truncate">{trail.name}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {trail.location}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
