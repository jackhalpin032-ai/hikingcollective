-- Create events table matching the app's event structure
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image TEXT NOT NULL,
  time TEXT NOT NULL,
  duration TEXT NOT NULL,
  organizer TEXT NOT NULL,
  organizer_avatar TEXT,
  departure_location TEXT NOT NULL,
  transport_method TEXT NOT NULL,
  activity TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  distance TEXT NOT NULL,
  elevation TEXT NOT NULL,
  total_height TEXT,
  attendees INTEGER NOT NULL DEFAULT 0,
  available_spots INTEGER,
  waitlist INTEGER,
  attendee_avatars TEXT[] DEFAULT '{}',
  route_id TEXT,
  event_date DATE NOT NULL,
  date_label TEXT NOT NULL,
  is_past BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (events are public)
CREATE POLICY "Events are publicly readable"
ON public.events
FOR SELECT
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();