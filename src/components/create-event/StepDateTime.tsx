import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Clock, Sun, Sunrise, Sunset, Moon } from 'lucide-react';
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
  { value: '05:00', label: '5:00 AM', icon: Sunrise, period: 'Early bird' },
  { value: '06:00', label: '6:00 AM', icon: Sunrise, period: 'Early bird' },
  { value: '07:00', label: '7:00 AM', icon: Sunrise, period: 'Morning' },
  { value: '08:00', label: '8:00 AM', icon: Sun, period: 'Morning' },
  { value: '09:00', label: '9:00 AM', icon: Sun, period: 'Morning' },
  { value: '10:00', label: '10:00 AM', icon: Sun, period: 'Morning' },
  { value: '11:00', label: '11:00 AM', icon: Sun, period: 'Late morning' },
  { value: '12:00', label: '12:00 PM', icon: Sun, period: 'Noon' },
  { value: '13:00', label: '1:00 PM', icon: Sun, period: 'Afternoon' },
  { value: '14:00', label: '2:00 PM', icon: Sun, period: 'Afternoon' },
  { value: '15:00', label: '3:00 PM', icon: Sunset, period: 'Afternoon' },
  { value: '16:00', label: '4:00 PM', icon: Sunset, period: 'Late afternoon' },
  { value: '17:00', label: '5:00 PM', icon: Sunset, period: 'Evening' },
  { value: '18:00', label: '6:00 PM', icon: Moon, period: 'Evening' },
  { value: '19:00', label: '7:00 PM', icon: Moon, period: 'Evening' },
];

export function StepDateTime({ date, time, onDateChange, onTimeChange, onContinue }: StepDateTimeProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  
  const isComplete = date && time;

  return (
    <div className="flex flex-col">
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
          When are you heading out? ⏰
        </h2>
        <p className="text-sm text-muted-foreground">
          Pick a date and time that works for your crew. Early starts mean cooler trails!
        </p>
      </div>

      <div className="flex flex-col gap-5 max-w-md mx-auto w-full">
        {/* Date Picker */}
        <div className="w-full">
          <label className="block text-sm font-medium text-foreground mb-2">
            Pick a date
          </label>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-11",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "EEEE, MMMM d, yyyy") : "Choose a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-[60]" align="center">
              <Calendar
                mode="single"
                selected={date ?? undefined}
                onSelect={(newDate) => {
                  onDateChange(newDate);
                  setCalendarOpen(false);
                }}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Picker */}
        <div className="w-full">
          <label className="block text-sm font-medium text-foreground mb-2">
            Set a meeting time
          </label>
          <Select value={time} onValueChange={onTimeChange}>
            <SelectTrigger className="w-full h-11">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Choose a time" />
              </div>
            </SelectTrigger>
            <SelectContent className="z-[60]">
              {TIME_SLOTS.map(({ value, label, icon: Icon, period }) => (
                <SelectItem key={value} value={value}>
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span>{label}</span>
                    <span className="text-muted-foreground text-xs">({period})</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Friendly tip */}
        {date && time && (
          <div className="w-full p-3 rounded-lg bg-primary/10 border border-primary/20 animate-fade-in">
            <p className="text-sm text-primary font-medium text-center">
              🌄 Great choice! {format(date, "EEEE")} at {TIME_SLOTS.find(t => t.value === time)?.label} — 
              perfect for beating the crowds!
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-border flex justify-end">
        <Button 
          size="default" 
          onClick={onContinue}
          disabled={!isComplete}
          className="px-8"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
