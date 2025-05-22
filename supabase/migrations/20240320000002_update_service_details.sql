-- Add new columns to service_details table
ALTER TABLE service_details
ADD COLUMN IF NOT EXISTS base_price DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS price_per_kg DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS min_weight DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS max_weight DECIMAL(10,2) NOT NULL DEFAULT 100,
ADD COLUMN IF NOT EXISTS is_international BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS delivery_time_min INTEGER NOT NULL DEFAULT 1,
ADD COLUMN IF NOT EXISTS delivery_time_max INTEGER NOT NULL DEFAULT 5;

-- Update existing services with new pricing and details
UPDATE service_details
SET 
  base_price = 10.00,
  price_per_kg = 2.50,
  min_weight = 0.1,
  max_weight = 30.0,
  is_international = false,
  delivery_time_min = 1,
  delivery_time_max = 3
WHERE title = 'Standard Shipping';

UPDATE service_details
SET 
  base_price = 15.00,
  price_per_kg = 3.00,
  min_weight = 0.1,
  max_weight = 30.0,
  is_international = false,
  delivery_time_min = 1,
  delivery_time_max = 2
WHERE title = 'Express Shipping';

UPDATE service_details
SET 
  base_price = 25.00,
  price_per_kg = 4.00,
  min_weight = 0.1,
  max_weight = 30.0,
  is_international = true,
  delivery_time_min = 3,
  delivery_time_max = 7
WHERE title = 'International Shipping';

-- Insert new services only if they don't exist
INSERT INTO service_details (
  id,
  title,
  description,
  icon,
  order_index,
  base_price,
  price_per_kg,
  min_weight,
  max_weight,
  is_international,
  delivery_time_min,
  delivery_time_max
)
SELECT 
  '88888888-8888-8888-8888-888888888888',
  'Door-to-Door Domestic',
  'Fast and reliable door-to-door delivery service within the country',
  'truck',
  4,
  20.00,
  3.50,
  0.1,
  50.0,
  false,
  1,
  2
WHERE NOT EXISTS (
  SELECT 1 FROM service_details WHERE id = '88888888-8888-8888-8888-888888888888'
);

INSERT INTO service_details (
  id,
  title,
  description,
  icon,
  order_index,
  base_price,
  price_per_kg,
  min_weight,
  max_weight,
  is_international,
  delivery_time_min,
  delivery_time_max
)
SELECT 
  '99999999-9999-9999-9999-999999999999',
  'Door-to-Door International',
  'Premium door-to-door delivery service for international shipments',
  'globe',
  5,
  35.00,
  5.00,
  0.1,
  50.0,
  true,
  3,
  7
WHERE NOT EXISTS (
  SELECT 1 FROM service_details WHERE id = '99999999-9999-9999-9999-999999999999'
); 