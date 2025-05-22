-- Drop all existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can create their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can create shipments" ON public.shipments;
DROP POLICY IF EXISTS "Users can view their own shipments" ON public.shipments;
DROP POLICY IF EXISTS "Users can view timeline events for their shipments" ON public.timeline_events;
DROP POLICY IF EXISTS "Users can create timeline events for their shipments" ON public.timeline_events;

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline_events ENABLE ROW LEVEL SECURITY;

-- Create simple policies for profiles
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can create their own profile"
ON public.profiles
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = id);

-- Create simple policies for shipments
CREATE POLICY "Users can create shipments"
ON public.shipments
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own shipments"
ON public.shipments
FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Create simple policies for timeline events
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