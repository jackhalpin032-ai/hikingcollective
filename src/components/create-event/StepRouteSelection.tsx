import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface StepRouteSelectionProps {
  onContinue: () => void;
}

export function StepRouteSelection({ onContinue }: StepRouteSelectionProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Pick a route for your group 🗺️
        </h2>
        <p className="text-muted-foreground">
          Choose from our collection of tried-and-tested routes, or add your own.
        </p>
      </div>

      {/* Placeholder content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center p-12 rounded-xl border-2 border-dashed border-muted-foreground/30 bg-muted/30 max-w-lg">
          <MapPin className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            Route selection coming soon
          </h3>
          <p className="text-sm text-muted-foreground/70">
            This feature is under development. For now, you can skip to the next step.
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button 
          size="lg" 
          onClick={onContinue}
          className="px-12"
        >
          Continue without route
        </Button>
      </div>
    </div>
  );
}
