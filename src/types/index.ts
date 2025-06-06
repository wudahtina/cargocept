export type UserRole = 'user' | 'admin';

export type ShipmentStatus = 
  | 'Pending' 
  | 'Accepted' 
  | 'Processing' 
  | 'In Transit' 
  | 'Out for Delivery'
  | 'Delivered' 
  | 'Failed' 
  | 'Cancelled'
  | 'Courier Heading to Cargo'
  | 'Hold';

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  address: Address;
}

export interface TimelineEvent {
  id: string;
  timestamp: string; // ISO string
  description: string;
  location?: string;
  status: ShipmentStatus;
}

export interface Shipment {
  id: string;
  trackingId: string;
  userId: string;
  sender: ContactInfo;
  recipient: ContactInfo;
  parcelDescription: string;
  weight: number; // in kg
  dimensions: {
    length: number; // in cm
    width: number;
    height: number;
  };
  serviceId: string;
  expectedDeliveryDate: string; // ISO string
  status: ShipmentStatus;
  timeline: TimelineEvent[];
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}
