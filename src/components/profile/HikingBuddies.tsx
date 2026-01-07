import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronRight } from 'lucide-react';

interface HikingBuddy {
  name: string;
  photo?: string;
  hikesTogther: number;
  lastHike: string;
}

interface HikingBuddiesProps {
  buddies: HikingBuddy[];
  onViewAll?: () => void;
}

export default function HikingBuddies({ buddies, onViewAll }: HikingBuddiesProps) {
  return (
    <div className="bg-card rounded-2xl p-5 shadow-sm border border-border/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-foreground">Hiking Buddies</h3>
        {onViewAll && (
          <button 
            onClick={onViewAll}
            className="text-primary text-sm font-medium flex items-center gap-1 hover:underline"
          >
            View all <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
      
      <div className="space-y-3">
        {buddies.map((buddy, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-3 p-2 -mx-2 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <Avatar className="w-12 h-12 border-2 border-background shadow-sm">
              <AvatarImage src={buddy.photo} alt={buddy.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {buddy.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground text-sm">{buddy.name}</p>
              <p className="text-xs text-muted-foreground">
                {buddy.hikesTogther} hikes together
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Last hike</p>
              <p className="text-xs font-medium text-foreground">{buddy.lastHike}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
