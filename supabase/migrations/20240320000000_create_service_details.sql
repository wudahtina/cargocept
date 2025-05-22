create table if not exists service_details (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  icon text,
  order_index integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert some default services with explicit UUIDs
insert into service_details (id, title, description, icon, order_index) values
  ('11111111-1111-1111-1111-111111111111', 'Standard Shipping', 'Regular delivery within 5-7 business days', 'truck', 1),
  ('22222222-2222-2222-2222-222222222222', 'Express Shipping', 'Fast delivery within 2-3 business days', 'clock', 2),
  ('33333333-3333-3333-3333-333333333333', 'Premium Shipping', 'Priority handling with insurance and tracking', 'shield', 3),
  ('44444444-4444-4444-4444-444444444444', 'International Shipping', 'Worldwide delivery with customs handling', 'package', 4); 