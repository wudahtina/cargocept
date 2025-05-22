-- Create service_details table
create table if not exists service_details (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  icon text,
  order_index integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create shipments table
create table if not exists shipments (
  id uuid default gen_random_uuid() primary key,
  tracking_id text unique not null,
  user_id uuid references auth.users(id),
  service_id uuid references service_details(id),
  status text not null default 'Pending',
  expected_delivery_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Sender details
  sender_name text not null,
  sender_email text not null,
  sender_phone text not null,
  sender_street text not null,
  sender_city text not null,
  sender_state text not null,
  sender_postal_code text not null,
  sender_country text not null,
  
  -- Recipient details
  recipient_name text not null,
  recipient_email text not null,
  recipient_phone text not null,
  recipient_street text not null,
  recipient_city text not null,
  recipient_state text not null,
  recipient_postal_code text not null,
  recipient_country text not null,
  
  -- Package details
  parcel_description text not null,
  weight decimal not null,
  length decimal not null,
  width decimal not null,
  height decimal not null
);

-- Create timeline_events table
create table if not exists timeline_events (
  id uuid default gen_random_uuid() primary key,
  shipment_id uuid references shipments(id) on delete cascade,
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null,
  description text not null,
  location text,
  status text not null
);

-- Create contact_submissions table
create table if not exists contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert default services only if they don't exist
do $$
begin
  if not exists (select 1 from service_details where id = '11111111-1111-1111-1111-111111111111') then
    insert into service_details (id, title, description, icon, order_index) values
      ('11111111-1111-1111-1111-111111111111', 'Standard Shipping', 'Regular delivery within 5-7 business days', 'truck', 1);
  end if;
  
  if not exists (select 1 from service_details where id = '22222222-2222-2222-2222-222222222222') then
    insert into service_details (id, title, description, icon, order_index) values
      ('22222222-2222-2222-2222-222222222222', 'Express Shipping', 'Fast delivery within 2-3 business days', 'clock', 2);
  end if;
  
  if not exists (select 1 from service_details where id = '33333333-3333-3333-3333-333333333333') then
    insert into service_details (id, title, description, icon, order_index) values
      ('33333333-3333-3333-3333-333333333333', 'Premium Shipping', 'Priority handling with insurance and tracking', 'shield', 3);
  end if;
  
  if not exists (select 1 from service_details where id = '44444444-4444-4444-4444-444444444444') then
    insert into service_details (id, title, description, icon, order_index) values
      ('44444444-4444-4444-4444-444444444444', 'International Shipping', 'Worldwide delivery with customs handling', 'package', 4);
  end if;
end $$;

-- Create RLS policies
alter table service_details enable row level security;
alter table shipments enable row level security;
alter table timeline_events enable row level security;
alter table contact_submissions enable row level security;

-- Service details policies (public read access)
create policy "Service details are viewable by everyone" on service_details
  for select using (true);

-- Shipments policies
create policy "Users can view their own shipments" on shipments
  for select using (auth.uid() = user_id);

create policy "Users can create their own shipments" on shipments
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own shipments" on shipments
  for update using (auth.uid() = user_id);

-- Timeline events policies
create policy "Users can view their shipment timeline events" on timeline_events
  for select using (
    exists (
      select 1 from shipments
      where shipments.id = timeline_events.shipment_id
      and shipments.user_id = auth.uid()
    )
  );

create policy "Users can create timeline events for their shipments" on timeline_events
  for insert with check (
    exists (
      select 1 from shipments
      where shipments.id = timeline_events.shipment_id
      and shipments.user_id = auth.uid()
    )
  );

-- Contact submissions policies
create policy "Anyone can submit contact form" on contact_submissions
  for insert with check (true);

create policy "Only authenticated users can view contact submissions" on contact_submissions
  for select using (auth.role() = 'authenticated'); 