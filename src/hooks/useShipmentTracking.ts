
import { useState } from 'react';
import { Shipment } from '@/types';
import { getShipmentByTrackingId } from '@/services/shipmentService';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';

export const useShipmentTracking = (trackingId?: string) => {
  const [isSearching, setIsSearching] = useState(false);
  
  const { 
    data: shipment,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['shipment', trackingId],
    queryFn: () => trackingId ? getShipmentByTrackingId(trackingId) : Promise.resolve(null),
    enabled: !!trackingId,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const searchShipment = async (id: string) => {
    setIsSearching(true);
    try {
      const result = await getShipmentByTrackingId(id);
      if (!result) {
        toast({
          title: "Shipment Not Found",
          description: `No shipment found with tracking ID: ${id}`,
          variant: "destructive",
        });
        return null;
      }
      return result;
    } catch (error) {
      console.error("Error searching for shipment:", error);
      toast({
        title: "Error",
        description: "An error occurred while searching for the shipment.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsSearching(false);
    }
  };

  return {
    shipment,
    isLoading: isLoading || isSearching,
    isError,
    error,
    searchShipment,
    refetch,
  };
};
