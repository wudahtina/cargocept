export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  order_index: number;
  updated_at: string;
  base_price: number;
  price_per_kg: number;
  min_weight: number;
  max_weight: number;
  is_international: boolean;
  delivery_time_min: number;
  delivery_time_max: number;
} 