import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface StepEventDetailsProps {
  eventName: string;
  maxParticipants: number | null;
  onEventNameChange: (name: string) => void;
  onMaxParticipantsChange: (count: number | null) => void;
  onSubmit: () => void;
}

export function StepEventDetails({
  eventName,
  maxParticipants,
  onEventNameChange,
  onMaxParticipantsChange,
  onSubmit,
}: StepEventDetailsProps) {
  const isValid = eventName.trim().length > 0;

  const handleParticipantsChange = (value: string) => {
    const num = parseInt(value, 10);
    onMaxParticipantsChange(isNaN(num) || num <= 0 ? null : num);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-6">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl font-bold text-foreground">
            Let's wrap it up! 🎉
          </h2>
          <p className="text-muted-foreground">
            Give your event a name and set how many adventurers can join.
          </p>
        </div>

        <div className="max-w-md mx-auto space-y-6">
          <div className="space-y-2">
            <Label htmlFor="event-name" className="text-sm font-medium">
              Event Name
            </Label>
            <Input
              id="event-name"
              placeholder="e.g., Sunday Mountain Trek"
              value={eventName}
              onChange={(e) => onEventNameChange(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-participants" className="text-sm font-medium">
              Number of Participants
            </Label>
            <Input
              id="max-participants"
              type="number"
              min={1}
              placeholder="e.g., 10"
              value={maxParticipants ?? ''}
              onChange={(e) => handleParticipantsChange(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Leave empty for unlimited spots.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-border mt-6">
        <Button
          onClick={onSubmit}
          disabled={!isValid}
          className="w-full"
        >
          Create Event
        </Button>
      </div>
    </div>
  );
}
