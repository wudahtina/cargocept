-- Drop existing policies
DROP POLICY IF EXISTS "Users can create shipments" ON public.shipments;
DROP POLICY IF EXISTS "Users can view their own shipments" ON public.shipments;
DROP POLICY IF EXISTS "Users can view timeline events for their shipments" ON public.timeline_events;
DROP POLICY IF EXISTS "Users can create timeline events for their shipments" ON public.timeline_events;

-- Create new policies
CREATE POLICY "Users can create shipments"
ON public.shipments
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own shipments"
ON public.shipments
FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can view timeline events for their shipments"
ON public.timeline_events
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.shipments
    WHERE shipments.id = timeline_events.shipment_id
    AND shipments.user_id = auth.uid()
  )
);

-- Add policy for timeline event creation
CREATE POLICY "Users can create timeline events for their shipments"
ON public.timeline_events
FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.shipments
    WHERE shipments.id = timeline_events.shipment_id
    AND shipments.user_id = auth.uid()
  )
); 