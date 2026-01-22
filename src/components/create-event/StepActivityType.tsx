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
    <div className="flex flex-col h-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          What adventure are you planning? 🎒
        </h2>
        <p className="text-muted-foreground">
          Pick an activity type to get started. You can always change this later!
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto flex-1">
        {ACTIVITY_OPTIONS.map(({ type, label }) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className={cn(
              "flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 transition-all duration-200",
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
                "h-10 w-10 transition-colors",
                selectedActivity === type ? "text-primary" : "text-muted-foreground"
              )} 
            />
            <span className={cn(
              "font-medium text-lg",
              selectedActivity === type ? "text-primary" : "text-foreground"
            )}>
              {label}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button 
          size="lg" 
          onClick={onContinue}
          disabled={!selectedActivity}
          className="px-12"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
