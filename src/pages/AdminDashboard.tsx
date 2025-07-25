import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminDashboard = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: shipments, isLoading } = useQuery({
    queryKey: ['all-shipments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('shipments')
        .select(`
          *,
          timeline_events (
            id,
            timestamp,
            description,
            location
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ shipmentId, newStatus, location }: { shipmentId: string; newStatus: string; location: string }) => {
      // Update shipment status
      const { error: shipmentError } = await supabase
        .from('shipments')
        .update({ status: newStatus })
        .eq('id', shipmentId);

      if (shipmentError) throw shipmentError;

      // Add timeline event
      const { error: timelineError } = await supabase
        .from('timeline_events')
        .insert({
          shipment_id: shipmentId,
          timestamp: new Date().toISOString(),
          description: `Status updated to ${newStatus}`,
          location: location,
          status: newStatus
        });

      if (timelineError) throw timelineError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-shipments'] });
      toast({
        title: "Status updated successfully",
        description: "The shipment status has been updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating status",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const updateDeliveryDateMutation = useMutation({
    mutationFn: async ({ shipmentId, newDate }: { shipmentId: string; newDate: Date }) => {
      const { error } = await supabase
        .from('shipments')
        .update({ 
          expected_delivery_date: newDate.toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', shipmentId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-shipments'] });
      toast({
        title: "Delivery date updated",
        description: "The expected delivery date has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating delivery date",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleStatusUpdate = (shipmentId: string, newStatus: string) => {
    let location = '';
    switch (newStatus) {
      case 'In Transit':
        location = 'Sorting Facility';
        break;
      case 'Courier Heading for Cargo':
        location = 'Local Distribution Center';
        break;
      case 'Delivered':
        location = 'Final Destination';
        break;
      default:
        location = 'Processing Center';
    }

    updateStatusMutation.mutate({ shipmentId, newStatus, location });
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Manage Shipments</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <div className="space-y-4">
                {shipments?.map((shipment) => (
                  <div
                    key={shipment.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">Tracking ID: {shipment.tracking_id}</p>
                      <p className="text-sm text-muted-foreground">
                        Created: {format(new Date(shipment.created_at), 'MMM dd, yyyy')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Current Status: {shipment.status}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Expected Delivery: {format(new Date(shipment.expected_delivery_date), 'MMM dd, yyyy')}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[200px] justify-start text-left font-normal",
                              !shipment.expected_delivery_date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {shipment.expected_delivery_date ? (
                              format(new Date(shipment.expected_delivery_date), 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={new Date(shipment.expected_delivery_date)}
                            onSelect={(date) => {
                              if (date) {
                                updateDeliveryDateMutation.mutate({
                                  shipmentId: shipment.id,
                                  newDate: date
                                });
                              }
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <Select
                        onValueChange={(value) => handleStatusUpdate(shipment.id, value)}
                        defaultValue={shipment.status}
                      >
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Update Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Accepted">Accepted</SelectItem>
                          <SelectItem value="Processing">Processing</SelectItem>
                          <SelectItem value="In Transit">In Transit</SelectItem>
                          <SelectItem value="Courier Heading to Cargo">Courier Heading to Cargo</SelectItem>
                          <SelectItem value="Hold">Hold (Custom Verification)</SelectItem>
                          <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                          <SelectItem value="Delivered">Delivered</SelectItem>
                          <SelectItem value="Failed">Failed</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminDashboard; 