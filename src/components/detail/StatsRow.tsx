import { Mountain, ArrowLeftRight, TrendingUp, Clock } from 'lucide-react';

interface Stat {
  icon?: React.ElementType;
  label: string;
  value: string;
}

interface StatsRowProps {
  stats: Stat[];
}

export default function StatsRow({ stats }: StatsRowProps) {
  const defaultIcons: Record<string, React.ElementType> = {
    Activity: Mountain,
    Distance: ArrowLeftRight,
    Elevation: TrendingUp,
    Duration: Clock,
  };

  return (
    <div className="flex items-center justify-between py-3 border-y border-border">
      {stats.map((stat, idx) => {
        const Icon = stat.icon || defaultIcons[stat.label] || Mountain;
        return (
          <div key={idx} className="text-center flex-1">
            <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
            <div className="flex items-center justify-center gap-1.5">
              <Icon className="w-4 h-4 text-primary" />
              <span className="font-semibold text-foreground text-sm">{stat.value}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
