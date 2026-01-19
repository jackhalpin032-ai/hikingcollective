import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown } from 'lucide-react';

interface Participant {
  name: string;
  photo?: string;
}

interface ParticipantsRowProps {
  participants: Participant[];
  totalCount: number;
  maxCount: number;
  status: 'available' | 'going' | 'organiser' | 'closed' | 'waitlist';
  onJoin?: () => void;
  onOptions?: () => void;
}

export default function ParticipantsRow({
  participants,
  totalCount,
  maxCount,
  status,
  onJoin,
  onOptions,
}: ParticipantsRowProps) {
  const spotsLeft = maxCount - totalCount;
  const displayAvatars = participants.slice(0, 5);

  return (
    <div className="flex items-center justify-between py-3">
      {/* Avatars */}
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {displayAvatars.map((p, idx) => (
            <Avatar key={idx} className="w-8 h-8 border-2 border-background">
              <AvatarImage src={p.photo} alt={p.name} />
              <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                {p.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          ))}
          {totalCount > 5 && (
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border-2 border-background">
              <span className="text-xs font-medium text-muted-foreground">+{totalCount - 5}</span>
            </div>
          )}
        </div>
        <span className="text-sm text-muted-foreground">
          {totalCount} out of {maxCount} / {spotsLeft > 0 ? `${spotsLeft} spots left` : 'Full'}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {status === 'going' && (
          <>
            <Badge className="bg-primary text-primary-foreground">You joined</Badge>
            <Button variant="outline" size="sm" onClick={onOptions}>
              Join options <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </>
        )}
        {status === 'organiser' && (
          <>
            <Button variant="outline" size="sm">Review participants</Button>
            <Button variant="outline" size="sm">Upload photos</Button>
          </>
        )}
        {status === 'available' && spotsLeft > 0 && (
          <Button size="sm" className="bg-primary" onClick={onJoin}>
            Join event
          </Button>
        )}
        {status === 'waitlist' && (
          <Badge variant="secondary">On waitlist</Badge>
        )}
      </div>
    </div>
  );
}
