import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface StepDateTimeProps {
  date: Date | null;
  time: string;
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (time: string) => void;
  onContinue: () => void;
}

const TIME_SLOTS = [
  { value: '05:00', label: '05:00' },
  { value: '05:30', label: '05:30' },
  { value: '06:00', label: '06:00' },
  { value: '06:30', label: '06:30' },
  { value: '07:00', label: '07:00' },
  { value: '07:30', label: '07:30' },
  { value: '08:00', label: '08:00' },
  { value: '08:30', label: '08:30' },
  { value: '09:00', label: '09:00' },
  { value: '09:30', label: '09:30' },
  { value: '10:00', label: '10:00' },
  { value: '10:30', label: '10:30' },
  { value: '11:00', label: '11:00' },
  { value: '11:30', label: '11:30' },
  { value: '12:00', label: '12:00' },
  { value: '12:30', label: '12:30' },
  { value: '13:00', label: '13:00' },
  { value: '13:30', label: '13:30' },
  { value: '14:00', label: '14:00' },
  { value: '14:30', label: '14:30' },
  { value: '15:00', label: '15:00' },
  { value: '15:30', label: '15:30' },
  { value: '16:00', label: '16:00' },
  { value: '16:30', label: '16:30' },
  { value: '17:00', label: '17:00' },
  { value: '17:30', label: '17:30' },
  { value: '18:00', label: '18:00' },
  { value: '18:30', label: '18:30' },
  { value: '19:00', label: '19:00' },
];

export function StepDateTime({ date, time, onDateChange, onTimeChange, onContinue }: StepDateTimeProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  
  const isComplete = date && time;

  // Format the time for display (e.g., "08:30" -> "08:30")
  const formatTimeDisplay = (timeValue: string) => {
    return timeValue;
  };

  return (
    <div className="flex flex-col py-6 md:py-10 max-w-2xl mx-auto w-full">
      {/* Header - Left aligned like reference */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          When are you heading out?
        </h2>
        <p className="text-muted-foreground">
          Pick a date and time that works for you and your crew. Don't worry, you can always adjust later! 📅
        </p>
      </div>

      {/* Date and Time side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Date Picker */}
        <div className="w-full">
          <label className="block text-sm font-medium text-foreground mb-2">
            Date
          </label>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-12",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-3 h-4 w-4 text-muted-foreground" />
                {date ? format(date, "EEEE, MMMM do, yyyy") : "Select a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-[60]" align="start">
              <Calendar
                mode="single"
                selected={date ?? undefined}
                onSelect={(newDate) => {
                  onDateChange(newDate);
                  setCalendarOpen(false);
                }}
                disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Picker */}
        <div className="w-full">
          <label className="block text-sm font-medium text-foreground mb-2">
            Start time
          </label>
          <Select value={time} onValueChange={onTimeChange}>
            <SelectTrigger className="w-full h-12">
              <div className="flex items-center">
                <Clock className="mr-3 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Select time">
                  {time ? formatTimeDisplay(time) : "Select time"}
                </SelectValue>
              </div>
            </SelectTrigger>
            <SelectContent className="z-[60] max-h-60">
              {TIME_SLOTS.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Confirmation Banner */}
      {isComplete && (
        <div className="w-full p-4 rounded-lg border border-border bg-card mb-6 animate-fade-in">
          <p className="text-sm text-emerald-600 font-medium">
            🎉 Awesome! Your adventure is set for {format(date, "EEEE, MMMM do")} at {time}
          </p>
        </div>
      )}

      {/* Continue Button */}
      <div className="flex justify-end">
        <Button 
          size="lg" 
          onClick={onContinue}
          disabled={!isComplete}
          className="px-12 h-12"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
