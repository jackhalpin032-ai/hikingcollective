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
    <div className="flex flex-col">
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
          What adventure are you planning? 🎒
        </h2>
        <p className="text-sm text-muted-foreground">
          Pick an activity type to get started. You can always change this later!
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-xl mx-auto w-full">
        {ACTIVITY_OPTIONS.map(({ type, label }) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className={cn(
              "flex flex-col items-center justify-center gap-2 p-4 md:p-5 rounded-xl border-2 transition-all duration-200",
              "hover:border-primary hover:bg-primary/5 hover:scale-[1.02]",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              selectedActivity === type
                ? "border-primary bg-primary/10 shadow-md"
                : "border-border bg-card"
            )}
          >
            <ActivityIcon 
              type={type} 
              className={cn(
                "h-8 w-8 transition-colors",
                selectedActivity === type ? "text-primary" : "text-muted-foreground"
              )} 
            />
            <span className={cn(
              "font-medium",
              selectedActivity === type ? "text-primary" : "text-foreground"
            )}>
              {label}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border flex justify-end">
        <Button 
          size="default" 
          onClick={onContinue}
          disabled={!selectedActivity}
          className="px-8"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
