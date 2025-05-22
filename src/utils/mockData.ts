
import { Shipment, ShipmentStatus, TimelineEvent } from '../types';

// Generate a random tracking ID
export const generateTrackingId = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  
  let result = 'CG-';
  
  // Add 2 random letters
  for (let i = 0; i < 2; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  // Add hyphen
  result += '-';
  
  // Add 6 random numbers
  for (let i = 0; i < 6; i++) {
    result += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  
  return result;
};

// Generate sample timeline events based on status
export const generateTimelineEvents = (
  status: ShipmentStatus, 
  createdAt: string
): TimelineEvent[] => {
  const timeline: TimelineEvent[] = [];
  const createdDate = new Date(createdAt);
  
  // Always add order created event
  timeline.push({
    id: '1',
    timestamp: createdAt,
    description: 'Shipment created',
    location: 'Online System',
    status: 'Pending'
  });
  
  if (status === 'Pending') {
    return timeline;
  }
  
  // Add accepted event
  const acceptedDate = new Date(createdDate);
  acceptedDate.setHours(acceptedDate.getHours() + 2);
  timeline.push({
    id: '2',
    timestamp: acceptedDate.toISOString(),
    description: 'Shipment accepted by carrier',
    location: 'Logistics Center',
    status: 'Accepted'
  });
  
  if (status === 'Accepted') {
    return timeline;
  }
  
  // Add processing event
  const processingDate = new Date(acceptedDate);
  processingDate.setHours(processingDate.getHours() + 3);
  timeline.push({
    id: '3',
    timestamp: processingDate.toISOString(),
    description: 'Package received and being processed',
    location: 'Regional Distribution Center',
    status: 'Processing'
  });
  
  if (status === 'Processing') {
    return timeline;
  }
  
  // Add in transit event
  const transitDate = new Date(processingDate);
  transitDate.setHours(transitDate.getHours() + 5);
  timeline.push({
    id: '4',
    timestamp: transitDate.toISOString(),
    description: 'Shipment in transit',
    location: 'En Route',
    status: 'In Transit'
  });
  
  if (status === 'In Transit') {
    return timeline;
  }
  
  // Add out for delivery event
  const outForDeliveryDate = new Date(transitDate);
  outForDeliveryDate.setHours(outForDeliveryDate.getHours() + 24);
  timeline.push({
    id: '5',
    timestamp: outForDeliveryDate.toISOString(),
    description: 'Package out for delivery',
    location: 'Local Distribution Center',
    status: 'Out for Delivery'
  });
  
  if (status === 'Out for Delivery') {
    return timeline;
  }
  
  // Add delivered event
  const deliveredDate = new Date(outForDeliveryDate);
  deliveredDate.setHours(deliveredDate.getHours() + 4);
  timeline.push({
    id: '6',
    timestamp: deliveredDate.toISOString(),
    description: 'Package delivered',
    location: 'Destination',
    status: 'Delivered'
  });
  
  return timeline;
};

// Generate a sample shipment
export const generateSampleShipment = (
  id: string,
  status: ShipmentStatus = 'In Transit',
  userId: string = 'user1'
): Shipment => {
  const createdAt = new Date();
  createdAt.setDate(createdAt.getDate() - 3); // Created 3 days ago
  
  const expectedDeliveryDate = new Date();
  expectedDeliveryDate.setDate(expectedDeliveryDate.getDate() + 2); // Expected in 2 days
  
  return {
    id,
    trackingId: generateTrackingId(),
    userId,
    sender: {
      name: 'Alex Johnson',
      email: 'alex@example.com',
      phone: '+1 (555) 123-4567',
      address: {
        street: '123 Sender St',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94107',
        country: 'United States'
      }
    },
    recipient: {
      name: 'Sam Smith',
      email: 'sam@example.com',
      phone: '+1 (555) 987-6543',
      address: {
        street: '456 Receiver Ave',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'United States'
      }
    },
    parcelDescription: 'Electronics and accessories',
    weight: 5.2, // kg
    dimensions: {
      length: 30, // cm
      width: 25,
      height: 15
    },
    expectedDeliveryDate: expectedDeliveryDate.toISOString(),
    status,
    timeline: generateTimelineEvents(status, createdAt.toISOString()),
    createdAt: createdAt.toISOString(),
    updatedAt: new Date().toISOString()
  };
};

// Generate mock shipments for demo
export const generateMockShipments = (count = 5): Shipment[] => {
  const statuses: ShipmentStatus[] = [
    'Pending', 
    'Accepted', 
    'Processing', 
    'In Transit', 
    'Out for Delivery', 
    'Delivered'
  ];
  
  return Array.from({ length: count }, (_, i) => {
    // Cycle through statuses or randomize
    const status = statuses[i % statuses.length];
    return generateSampleShipment(`shipment${i+1}`, status);
  });
};

// Sample shipment for tracking demo
export const SAMPLE_SHIPMENT = generateSampleShipment('sample1', 'In Transit');
