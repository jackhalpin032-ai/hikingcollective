import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ActivityIcon } from './ActivityIcon';
import { ACTIVITY_OPTIONS, type ActivityType } from './types';

interface StepActivityTypeProps {
  selectedActivity: ActivityType | null;
  onSelect: (activity: ActivityType) => void;
  onContinue: () => void;
}

export function StepActivityType({ selectedActivity, onSelect, onContinue }: StepActivityTypeProps) {
  return (
    <div className="flex flex-col items-center py-6 md:py-10">
      {/* Header */}
      <div className="text-center mb-8 max-w-md">
        <h2 className="text-2xl md:text-3xl font-serif font-medium text-foreground mb-3">
          What adventure are you planning?
        </h2>
        <p className="text-muted-foreground">
          Pick an activity and let's get your crew together! 🎉
        </p>
      </div>

      {/* Activity Grid - 3x2 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-lg mb-8">
        {ACTIVITY_OPTIONS.map(({ type, label }) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className={cn(
              "flex flex-col items-center justify-center gap-3 p-5 md:p-6 rounded-xl border transition-all duration-200",
              "hover:border-primary/50 hover:shadow-sm",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              selectedActivity === type
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border bg-card"
            )}
          >
            {/* Icon in circular background */}
            <div className={cn(
              "flex items-center justify-center w-12 h-12 rounded-full transition-colors",
              selectedActivity === type
                ? "bg-primary/20"
                : "bg-muted"
            )}>
              <ActivityIcon 
                type={type} 
                className={cn(
                  "h-6 w-6 transition-colors",
                  selectedActivity === type ? "text-primary" : "text-muted-foreground"
                )} 
              />
            </div>
            <span className={cn(
              "font-medium text-sm",
              selectedActivity === type ? "text-primary" : "text-foreground"
            )}>
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Continue Button */}
      <Button 
        size="lg" 
        onClick={onContinue}
        disabled={!selectedActivity}
        className="px-12 h-12"
      >
        Continue
      </Button>
    </div>
  );
}
