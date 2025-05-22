-- Add missing fields to service_details table
ALTER TABLE public.service_details
ADD COLUMN IF NOT EXISTS base_price DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS price_per_kg DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS min_weight DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS max_weight DECIMAL(10,2) NOT NULL DEFAULT 100,
ADD COLUMN IF NOT EXISTS is_international BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS delivery_time_min INTEGER NOT NULL DEFAULT 5,
ADD COLUMN IF NOT EXISTS delivery_time_max INTEGER NOT NULL DEFAULT 7;

-- Update existing services with default values
UPDATE public.service_details
SET 
    base_price = CASE 
        WHEN id = '11111111-1111-1111-1111-111111111111' THEN 10.00
        WHEN id = '22222222-2222-2222-2222-222222222222' THEN 20.00
        WHEN id = '33333333-3333-3333-3333-333333333333' THEN 30.00
        ELSE base_price
    END,
    price_per_kg = CASE 
        WHEN id = '11111111-1111-1111-1111-111111111111' THEN 2.00
        WHEN id = '22222222-2222-2222-2222-222222222222' THEN 3.00
        WHEN id = '33333333-3333-3333-3333-333333333333' THEN 4.00
        ELSE price_per_kg
    END,
    min_weight = 0.1,
    max_weight = 100,
    is_international = false,
    delivery_time_min = CASE 
        WHEN id = '11111111-1111-1111-1111-111111111111' THEN 5
        WHEN id = '22222222-2222-2222-2222-222222222222' THEN 2
        WHEN id = '33333333-3333-3333-3333-333333333333' THEN 1
        ELSE delivery_time_min
    END,
    delivery_time_max = CASE 
        WHEN id = '11111111-1111-1111-1111-111111111111' THEN 7
        WHEN id = '22222222-2222-2222-2222-222222222222' THEN 3
        WHEN id = '33333333-3333-3333-3333-333333333333' THEN 2
        ELSE delivery_time_max
    END; 