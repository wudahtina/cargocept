-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can create shipments" ON public.shipments;
DROP POLICY IF EXISTS "Users can view their own shipments" ON public.shipments;
DROP POLICY IF EXISTS "Users can view timeline events for their shipments" ON public.timeline_events;
DROP POLICY IF EXISTS "Users can view services" ON public.service_details;

-- Create shipments table
CREATE TABLE IF NOT EXISTS public.shipments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tracking_id TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    service_id UUID REFERENCES public.service_details(id),
    sender_name TEXT NOT NULL,
    sender_email TEXT NOT NULL,
    sender_phone TEXT NOT NULL,
    sender_street TEXT NOT NULL,
    sender_city TEXT NOT NULL,
    sender_state TEXT NOT NULL,
    sender_postal_code TEXT NOT NULL,
    sender_country TEXT NOT NULL,
    recipient_name TEXT NOT NULL,
    recipient_email TEXT NOT NULL,
    recipient_phone TEXT NOT NULL,
    recipient_street TEXT NOT NULL,
    recipient_city TEXT NOT NULL,
    recipient_state TEXT NOT NULL,
    recipient_postal_code TEXT NOT NULL,
    recipient_country TEXT NOT NULL,
    parcel_description TEXT NOT NULL,
    weight DECIMAL(10,2) NOT NULL,
    length DECIMAL(10,2) NOT NULL,
    width DECIMAL(10,2) NOT NULL,
    height DECIMAL(10,2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending',
    expected_delivery_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create timeline_events table
CREATE TABLE IF NOT EXISTS public.timeline_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    shipment_id UUID REFERENCES public.shipments(id) ON DELETE CASCADE,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    description TEXT NOT NULL,
    location TEXT,
    status TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create service_details table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.service_details (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default services if they don't exist
INSERT INTO public.service_details (id, title, description, icon, order_index)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'Standard Shipping', 'Regular shipping service with 5-7 business days delivery', 'truck', 1),
    ('22222222-2222-2222-2222-222222222222', 'Express Shipping', 'Fast shipping service with 2-3 business days delivery', 'zap', 2),
    ('33333333-3333-3333-3333-333333333333', 'Premium Shipping', 'Premium shipping service with 1-2 business days delivery', 'star', 3)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_details ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to create shipments
CREATE POLICY "Users can create shipments" ON public.shipments
    FOR INSERT TO authenticated
    WITH CHECK (true);

-- Allow users to view their own shipments
CREATE POLICY "Users can view their own shipments" ON public.shipments
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

-- Allow users to view timeline events for their shipments
CREATE POLICY "Users can view timeline events for their shipments" ON public.timeline_events
    FOR SELECT TO authenticated
    USING (EXISTS (
        SELECT 1 FROM public.shipments
        WHERE shipments.id = timeline_events.shipment_id
        AND shipments.user_id = auth.uid()
    ));

-- Allow all authenticated users to view services
CREATE POLICY "Users can view services" ON public.service_details
    FOR SELECT TO authenticated
    USING (true); 