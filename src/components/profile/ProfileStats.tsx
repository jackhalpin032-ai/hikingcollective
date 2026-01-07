import { Mountain, Bike, Compass, Timer } from 'lucide-react';

interface ProfileStatsProps {
  stats: {
    hiking: number;
    cycling: number;
    climbing: number;
    viaFerrata: number;
  };
  distance: string;
  elevation: string;
}

export default function ProfileStats({ stats, distance, elevation }: ProfileStatsProps) {
  return (
    <div className="bg-card rounded-2xl p-5 shadow-sm border border-border/50">
      <div className="flex items-center justify-center gap-6 mb-4">
        <div className="flex items-center gap-2 text-foreground">
          <Mountain className="w-4 h-4 text-primary" />
          <span className="font-semibold">{stats.hiking}</span>
        </div>
        <div className="flex items-center gap-2 text-foreground">
          <Bike className="w-4 h-4 text-primary" />
          <span className="font-semibold">{stats.cycling}</span>
        </div>
        <div className="flex items-center gap-2 text-foreground">
          <Compass className="w-4 h-4 text-primary" />
          <span className="font-semibold">{stats.climbing}</span>
        </div>
        <div className="flex items-center gap-2 text-foreground">
          <Timer className="w-4 h-4 text-primary" />
          <span className="font-semibold">{stats.viaFerrata}</span>
        </div>
      </div>
      
      <div className="flex justify-center gap-8 text-sm">
        <div>
          <span className="text-muted-foreground">Distance: </span>
          <span className="font-bold text-foreground">{distance}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Elevation: </span>
          <span className="font-bold text-foreground">{elevation}</span>
        </div>
      </div>
    </div>
  );
}
