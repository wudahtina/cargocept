-- Add policy for public tracking access
CREATE POLICY "Anyone can view shipments by tracking ID"
ON public.shipments
FOR SELECT
USING (true);

-- Add policy for public timeline events access
CREATE POLICY "Anyone can view timeline events for tracked shipments"
ON public.timeline_events
FOR SELECT
USING (true); 