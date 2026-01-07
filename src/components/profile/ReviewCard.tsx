import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ReviewCardProps {
  content: string;
  reviewerName: string;
  reviewerPhoto?: string;
  eventName: string;
  date: string;
}

export default function ReviewCard({ content, reviewerName, reviewerPhoto, eventName, date }: ReviewCardProps) {
  return (
    <div className="bg-card rounded-2xl p-5 shadow-sm border border-border/50 min-w-[280px] snap-center">
      <p className="text-foreground text-sm leading-relaxed mb-4 line-clamp-4">
        "{content}"
      </p>
      <div className="flex items-center gap-3">
        <Avatar className="w-9 h-9">
          <AvatarImage src={reviewerPhoto} alt={reviewerName} />
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
            {reviewerName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="text-xs">
          <p className="font-semibold text-foreground">{reviewerName}</p>
          <p className="text-muted-foreground">{eventName}, {date}</p>
        </div>
      </div>
    </div>
  );
}
