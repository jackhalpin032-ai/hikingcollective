-- Allow public inserts for event creation (prototype - no auth yet)
CREATE POLICY "Anyone can create events"
ON public.events
FOR INSERT
WITH CHECK (true);