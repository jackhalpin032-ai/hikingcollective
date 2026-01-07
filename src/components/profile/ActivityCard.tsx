import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mountain, MapPin, Train, Clock, ArrowLeftRight, TrendingUp, Share2, MessageCircle } from 'lucide-react';
import DifficultyBadge from './DifficultyBadge';

interface ActivityCardProps {
  organizer: {
    name: string;
    photo?: string;
    additionalCount?: number;
  };
  title: string;
  time: string;
  location: string;
  transport: string;
  difficulty: string;
  distance: string;
  elevation: string;
  duration: string;
  status: 'going' | 'organiser' | 'closed' | 'available';
  spotsAvailable?: number;
  onAction?: () => void;
}

export default function ActivityCard({ 
  organizer, 
  title, 
  time, 
  location, 
  transport, 
  difficulty,
  distance,
  elevation,
  duration,
  status,
  spotsAvailable,
  onAction 
}: ActivityCardProps) {
  const statusBadge = () => {
    switch (status) {
      case 'going':
        return <Badge className="bg-primary text-primary-foreground text-xs">You are going</Badge>;
      case 'organiser':
        return <Badge className="bg-amber-500 text-white text-xs">You're the organiser</Badge>;
      case 'closed':
        return <Badge variant="secondary" className="text-xs">Closed</Badge>;
      case 'available':
        return spotsAvailable ? (
          <Badge className="bg-primary/90 text-primary-foreground text-xs">{spotsAvailable} spot{spotsAvailable > 1 ? 's' : ''} available</Badge>
        ) : null;
    }
  };

  const actionButton = () => {
    switch (status) {
      case 'going':
        return <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10">Unjoin</Button>;
      case 'organiser':
        return <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary/10">Edit</Button>;
      default:
        return <Button size="sm" className="bg-primary text-primary-foreground">Join</Button>;
    }
  };

  return (
    <div className="bg-card rounded-2xl p-5 shadow-sm border border-border/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={organizer.photo} alt={organizer.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              {organizer.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground">
            {organizer.name}
            {organizer.additionalCount && (
              <span className="text-muted-foreground">, +{organizer.additionalCount}</span>
            )}
          </span>
        </div>
        {statusBadge()}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>

      {/* Status badge */}
      {status === 'going' && (
        <Badge className="bg-primary text-primary-foreground text-xs mb-3">You are going</Badge>
      )}
      {status === 'organiser' && (
        <Badge className="bg-amber-500/20 text-amber-600 border-amber-500/30 text-xs mb-3">You're the organiser</Badge>
      )}

      {/* Details */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <span>at {time}</span>
        <span>·</span>
        <span>from {location}</span>
        <span>·</span>
        <span className="flex items-center gap-1">
          <Train className="w-3 h-3" />
          by {transport}
        </span>
      </div>

      {/* Metrics */}
      <div className="flex items-center gap-4 mb-4">
        <DifficultyBadge level={difficulty} size="sm" />
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Mountain className="w-3.5 h-3.5" />
          <span>Hiking</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>{distance}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{elevation}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span>{duration}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1.5">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1.5">
            <MessageCircle className="w-4 h-4" />
            Comment
          </Button>
        </div>
        {actionButton()}
      </div>
    </div>
  );
}
