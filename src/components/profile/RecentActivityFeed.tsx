import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mountain, Users, Award, MessageCircle, Camera } from 'lucide-react';

type ActivityType = 'hike' | 'group' | 'achievement' | 'review' | 'photo';

interface ActivityFeedItem {
  type: ActivityType;
  title: string;
  description: string;
  timeAgo: string;
  image?: string;
  participants?: Array<{ name: string; photo?: string }>;
}

interface RecentActivityFeedProps {
  activities: ActivityFeedItem[];
}

const activityIcons: Record<ActivityType, React.ReactNode> = {
  hike: <Mountain className="w-4 h-4" />,
  group: <Users className="w-4 h-4" />,
  achievement: <Award className="w-4 h-4" />,
  review: <MessageCircle className="w-4 h-4" />,
  photo: <Camera className="w-4 h-4" />,
};

const activityColors: Record<ActivityType, string> = {
  hike: 'bg-primary/10 text-primary',
  group: 'bg-blue-500/10 text-blue-500',
  achievement: 'bg-amber-500/10 text-amber-500',
  review: 'bg-purple-500/10 text-purple-500',
  photo: 'bg-rose-500/10 text-rose-500',
};

export default function RecentActivityFeed({ activities }: RecentActivityFeedProps) {
  return (
    <div className="space-y-4">
      {activities.map((activity, idx) => (
        <div 
          key={idx} 
          className="flex gap-3 p-3 bg-card rounded-xl border border-border/50 hover:shadow-sm transition-shadow cursor-pointer animate-fade-in"
          style={{ animationDelay: `${idx * 100}ms` }}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${activityColors[activity.type]}`}>
            {activityIcons[activity.type]}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">{activity.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{activity.description}</p>
            
            {activity.participants && activity.participants.length > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex -space-x-2">
                  {activity.participants.slice(0, 4).map((p, i) => (
                    <Avatar key={i} className="w-6 h-6 border-2 border-background">
                      <AvatarImage src={p.photo} alt={p.name} />
                      <AvatarFallback className="text-[8px] bg-muted">
                        {p.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                {activity.participants.length > 4 && (
                  <span className="text-xs text-muted-foreground">
                    +{activity.participants.length - 4} more
                  </span>
                )}
              </div>
            )}
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.timeAgo}</span>
            {activity.image && (
              <img 
                src={activity.image} 
                alt="" 
                className="w-12 h-12 rounded-lg object-cover"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
