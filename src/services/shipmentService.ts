import { supabase } from "@/integrations/supabase/client";
import { Shipment, TimelineEvent, ShipmentStatus } from "@/types";
import { Service } from "@/types/service";
import { toast } from "@/hooks/use-toast";
import { generateTrackingId } from "@/utils/mockData";

// Fetch shipment by tracking ID
export const getShipmentByTrackingId = async (trackingId: string): Promise<Shipment | null> => {
  try {
    const { data: shipmentData, error: shipmentError } = await supabase
      .from('shipments')
      .select('*')
      .eq('tracking_id', trackingId)
      .single();

    if (shipmentError) {
      console.error("Error fetching shipment:", shipmentError);
      if (shipmentError.code === 'PGRST116') {
        toast({
          title: "Shipment not found",
          description: "No shipment found with the provided tracking ID.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error",
          description: "An error occurred while fetching the shipment details.",
          variant: "destructive"
        });
      }
      return null;
    }

    if (!shipmentData) {
      toast({
        title: "Shipment not found",
        description: "No shipment found with the provided tracking ID.",
        variant: "destructive"
      });
      return null;
    }

    // Fetch timeline events for this shipment
    const { data: timelineData, error: timelineError } = await supabase
      .from('timeline_events')
      .select('*')
      .eq('shipment_id', shipmentData.id)
      .order('timestamp', { ascending: false });

    if (timelineError) {
      console.error("Error fetching timeline events:", timelineError);
      toast({
        title: "Warning",
        description: "Could not fetch shipment timeline events.",
        variant: "destructive"
      });
    }

    // Transform the data into our application model
    const shipment: Shipment = {
      id: shipmentData.id,
      trackingId: shipmentData.tracking_id,
      userId: shipmentData.user_id,
      serviceId: shipmentData.service_id,
      status: shipmentData.status as ShipmentStatus,
      expectedDeliveryDate: shipmentData.expected_delivery_date,
      createdAt: shipmentData.created_at,
      updatedAt: shipmentData.updated_at,
      weight: shipmentData.weight,
      parcelDescription: shipmentData.parcel_description,
      dimensions: {
        length: shipmentData.length,
        width: shipmentData.width,
        height: shipmentData.height
      },
      sender: {
        name: shipmentData.sender_name,
        email: shipmentData.sender_email,
        phone: shipmentData.sender_phone,
        address: {
          street: shipmentData.sender_street,
          city: shipmentData.sender_city,
          state: shipmentData.sender_state,
          postalCode: shipmentData.sender_postal_code,
          country: shipmentData.sender_country
        }
      },
      recipient: {
        name: shipmentData.recipient_name,
        email: shipmentData.recipient_email,
        phone: shipmentData.recipient_phone,
        address: {
          street: shipmentData.recipient_street,
          city: shipmentData.recipient_city,
          state: shipmentData.recipient_state,
          postalCode: shipmentData.recipient_postal_code,
          country: shipmentData.recipient_country
        }
      },
      timeline: timelineData ? timelineData.map(event => ({
        id: event.id,
        timestamp: event.timestamp,
        description: event.description,
        location: event.location || undefined,
        status: event.status as ShipmentStatus
      })) : []
    };

    return shipment;
  } catch (error) {
    console.error("Unexpected error in getShipmentByTrackingId:", error);
    toast({
      title: "Error",
      description: "An unexpected error occurred while fetching the shipment details.",
      variant: "destructive"
    });
    return null;
  }
};

// Get all services
export const getServices = async (): Promise<Service[]> => {
  try {
    const { data, error } = await supabase
      .from('service_details')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      throw error;
    }

    return data.map(service => ({
      id: service.id,
      title: service.title,
      description: service.description,
      icon: service.icon,
      order_index: service.order_index,
      updated_at: service.updated_at,
      base_price: service.base_price,
      price_per_kg: service.price_per_kg,
      min_weight: service.min_weight,
      max_weight: service.max_weight,
      is_international: service.is_international,
      delivery_time_min: service.delivery_time_min,
      delivery_time_max: service.delivery_time_max
    }));
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
};

// Submit contact form
export const submitContactForm = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const { error } = await supabase.from('contact_submissions').insert([formData]);

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, error };
  }
};

// Create a new shipment
export const createShipment = async (shipmentData: Partial<Shipment>): Promise<Shipment | null> => {
  try {
    const trackingId = generateTrackingId();
    const now = new Date().toISOString();
    const expectedDeliveryDate = new Date();
    expectedDeliveryDate.setDate(expectedDeliveryDate.getDate() + 5); // Default to 5 days from now

    // Get the current user's ID
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Log the shipment data for debugging
    console.log('Creating shipment with data:', {
      trackingId,
      userId: user.id,
      serviceId: shipmentData.serviceId,
      sender: shipmentData.sender,
      recipient: shipmentData.recipient,
      parcelDescription: shipmentData.parcelDescription,
      weight: shipmentData.weight,
      dimensions: shipmentData.dimensions
    });

    // Validate required fields
    if (!shipmentData.sender?.name || !shipmentData.recipient?.name || !shipmentData.serviceId) {
      throw new Error('Missing required fields: sender, recipient, or service');
    }

    const { data: shipment, error: shipmentError } = await supabase
      .from('shipments')
      .insert([
        {
          tracking_id: trackingId,
          user_id: user.id,
          sender_name: shipmentData.sender.name,
          sender_email: shipmentData.sender.email,
          sender_phone: shipmentData.sender.phone,
          sender_street: shipmentData.sender.address.street,
          sender_city: shipmentData.sender.address.city,
          sender_state: shipmentData.sender.address.state,
          sender_postal_code: shipmentData.sender.address.postalCode,
          sender_country: shipmentData.sender.address.country,
          recipient_name: shipmentData.recipient.name,
          recipient_email: shipmentData.recipient.email,
          recipient_phone: shipmentData.recipient.phone,
          recipient_street: shipmentData.recipient.address.street,
          recipient_city: shipmentData.recipient.address.city,
          recipient_state: shipmentData.recipient.address.state,
          recipient_postal_code: shipmentData.recipient.address.postalCode,
          recipient_country: shipmentData.recipient.address.country,
          parcel_description: shipmentData.parcelDescription,
          weight: shipmentData.weight,
          length: shipmentData.dimensions?.length,
          width: shipmentData.dimensions?.width,
          height: shipmentData.dimensions?.height,
          service_id: shipmentData.serviceId,
          status: 'Pending',
          expected_delivery_date: expectedDeliveryDate.toISOString(),
          created_at: now,
          updated_at: now,
        },
      ])
      .select()
      .single();

    if (shipmentError) {
      console.error("Error creating shipment:", shipmentError);
      throw new Error(`Failed to create shipment: ${shipmentError.message}`);
    }

    if (!shipment) {
      throw new Error('No shipment data returned after creation');
    }

    // Create initial timeline event
    const { error: timelineError } = await supabase
      .from('timeline_events')
      .insert([
        {
          shipment_id: shipment.id,
          timestamp: now,
          description: 'Shipment created',
          status: 'Pending',
          location: shipmentData.sender.address.city,
        },
      ]);

    if (timelineError) {
      console.error("Error creating timeline event:", timelineError);
      // Don't throw here, as the shipment was created successfully
    }

    // Transform the data into our application model
    return {
      id: shipment.id,
      trackingId: shipment.tracking_id,
      userId: shipment.user_id,
      serviceId: shipment.service_id,
      status: shipment.status as ShipmentStatus,
      expectedDeliveryDate: shipment.expected_delivery_date,
      createdAt: shipment.created_at,
      updatedAt: shipment.updated_at,
      weight: shipment.weight,
      parcelDescription: shipment.parcel_description,
      dimensions: {
        length: shipment.length,
        width: shipment.width,
        height: shipment.height
      },
      sender: {
        name: shipment.sender_name,
        email: shipment.sender_email,
        phone: shipment.sender_phone,
        address: {
          street: shipment.sender_street,
          city: shipment.sender_city,
          state: shipment.sender_state,
          postalCode: shipment.sender_postal_code,
          country: shipment.sender_country
        }
      },
      recipient: {
        name: shipment.recipient_name,
        email: shipment.recipient_email,
        phone: shipment.recipient_phone,
        address: {
          street: shipment.recipient_street,
          city: shipment.recipient_city,
          state: shipment.recipient_state,
          postalCode: shipment.recipient_postal_code,
          country: shipment.recipient_country
        }
      },
      timeline: [{
        id: '1',
        timestamp: now,
        description: 'Shipment created',
        status: 'Pending',
        location: shipmentData.sender.address.city
      }]
    };
  } catch (error) {
    console.error("Error in createShipment:", error);
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to create shipment. Please try again.",
      variant: "destructive"
    });
    return null;
  }
};
