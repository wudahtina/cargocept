-- Create shipments table
CREATE TABLE shipments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tracking_id TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES auth.users(id),
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
    length INTEGER NOT NULL,
    width INTEGER NOT NULL,
    height INTEGER NOT NULL,
    service_id UUID REFERENCES service_details(id),
    status TEXT NOT NULL DEFAULT 'Pending',
    expected_delivery_date TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create timeline_events table
CREATE TABLE timeline_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    shipment_id UUID REFERENCES shipments(id) ON DELETE CASCADE,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    description TEXT NOT NULL,
    location TEXT,
    status TEXT NOT NULL
);

-- Create service_details table
CREATE TABLE service_details (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT,
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_submissions table
CREATE TABLE contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default shipping services
INSERT INTO service_details (title, description, icon, order_index) VALUES
    ('Standard Shipping', 'Regular delivery within 5-7 business days', 'truck', 1),
    ('Express Shipping', 'Fast delivery within 2-3 business days', 'package', 2),
    ('Priority Shipping', 'Next-day delivery for urgent shipments', 'clock', 3),
    ('Secure Shipping', 'Extra protection and insurance for valuable items', 'shield', 4);

-- Create indexes
CREATE INDEX idx_shipments_tracking_id ON shipments(tracking_id);
CREATE INDEX idx_shipments_user_id ON shipments(user_id);
CREATE INDEX idx_timeline_events_shipment_id ON timeline_events(shipment_id);
CREATE INDEX idx_service_details_order_index ON service_details(order_index); 