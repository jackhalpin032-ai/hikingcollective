import { cn } from "@/lib/utils";

interface DifficultyBadgeProps {
  level: string;
  count?: number;
  size?: 'sm' | 'md';
}

const difficultyColors: Record<string, string> = {
  T1: 'bg-emerald-400',
  T2: 'bg-emerald-500',
  T3: 'bg-yellow-400',
  T4: 'bg-orange-400',
  T5: 'bg-rose-400',
  T6: 'bg-rose-500',
};

export default function DifficultyBadge({ level, count, size = 'md' }: DifficultyBadgeProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div 
        className={cn(
          "rounded-full flex items-center justify-center font-bold text-white shadow-md",
          difficultyColors[level] || 'bg-muted',
          size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'
        )}
      >
        {level}
      </div>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground font-medium">{count}</span>
      )}
    </div>
  );
}
